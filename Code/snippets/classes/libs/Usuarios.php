<?php
/**
 * Entidad usuario
 * @author Augusto Silva <augusto@ingeniagroup.com.mx>
 * @package classes
 * @subpackage libs
 * @category entities
 */

class Usuarios extends Model{
    
    protected $_template = null;
    private $_PDOConn = null;
    
    public function __construct($conn) {
        
        $this->_tableName = '`cmv`.`digital_friday_mails` AS m';
        $this->_primaryKey = '`id`';
        $this->setMysqlConn($conn);
        $this->_PDOConn = $conn;
    }
    
    /**
     * valida si existe una sesion activa en sistema mediante la matriz de sesion.
     * @method isValidSession
     * @access public
     * @return boolean 
     */
    public function isValidSession ( ) {
        
        $mail       = ( isset( $_GET[ 'm' ] ) && !empty( $_GET[ 'm' ] ) ) ? $_GET[ 'm' ] : false;
        $session    = ( isset( $_GET[ 's' ] ) && !empty( $_GET[ 's' ] ) ) ? $_GET[ 's' ] : false;
        $message    = ( isset( $_GET[ 'e' ] ) && !empty( $_GET[ 'e' ] ) ) ? $_GET[ 'e' ] : false;
        
        return ( $mail ) ? ( ( $session ) ? true : ( ( $message )? true : false ) ) : false;
    }
    
    /**
     * Verificar si el registro ingresado existe
     * @author Jesús Antonio García Valadez
     * @var $data
     * @access public
     * @method login
     * @return string 
     */
    public function getExists ( $data ) {
        $response = array();
        $fields = array( 'm.`user_mail` AS Mail, m.`id_user` AS ID_User' );
        $conditions = array();
        $conditions['where']    = "m.`user_mail`='{$data['mail_verifier']}'";
        $parameters = array (
            'mail_verifier' => array ( 'requerido' => 1 ,'validador' => 'esAlfaNumerico', 'mensaje' => 'El correo es obligatorio.'),
            'session' => array ( 'requerido' => 1 ,'validador' => 'esNumerico', 'mensaje' => 'La sesión es obligatoria.'),
        );
        
        $site_url = SITE_URL . 'index.php';
        
        $form = new Validator( $data, $parameters );
        
        //  !Form invalid
        if ( !$form->validate( ) ) {
            
            $response = array( 'success' => 'false', 'message'=> $form->getMessage( ) );
        } else {
            //  !The form is valid
            
            try {
                $this->_PDOConn->beginTransaction( );
                $resultSet = $this->select( $fields, $conditions );
                
                if ( count( $resultSet ) > 0 ) {
                    $this->_PDOConn->commit();
                    return $resultSet[ 0 ][ 'ID_User' ];
                } else {
                    $this->_PDOConn->rollBack();
                    return false;
                }
            }catch ( PDOException $e ){
                $this->_PDOConn->rollBack();
                return false;
            }
        }
    }
    
    public function isAlreadyRegistered ( $id, $sessionToCheck ) {
        
        $response = array();
        $this->setTableName( '`cmv`.`digital_friday_registers` AS r, `cmv`.`digital_friday_sessions` AS s' );
        
        $fields = array( "r.`id_user_mail` AS ID_Mail, 
       (SELECT s.`id_session` AS ID_Session FROM `cmv`.`digital_friday_sessions` AS s WHERE s.`course_session` = '{$sessionToCheck}' ) AS ID_User" );
        $conditions = array();
        $site_url = SITE_URL . 'index.php';
        
        $conditions['where']    = "r.`id_user_mail` = '{$id}' AND s.`id_session` = '{$sessionToCheck}'";
        
        try {
            $this->_PDOConn->beginTransaction( );
            $resultSet = $this->select( $fields, $conditions );
            
            if ( count( $resultSet ) == 0 ) {
                
                $this->_PDOConn->commit();
                return false;
            } else {
                
                $this->_PDOConn->rollBack();
                return true;
            }
            
        }catch ( PDOException $e ){
            $this->_PDOConn->rollBack();
            $response = array ('success'=>'false','msg'=>'el servicio no esta disponible');
        }
    }
    
    /**
     * actualizar los datos del usuario.
     * @method saveUser
     * @access public
     * @param mixed $data contiene la informacion basica necesaria
     * @return string 
     */
    public function saveUser ( $data, $id, $sessionToCheck ) {
        $response   = array();
        $id_course;
        
        //  Obtiene el id del curso
        try {
            $this->setTableName( '`cmv`.`digital_friday_sessions` AS s' );
            $fields = array( "s.`id_session` AS ID_Session, s.`course_session` AS Course" );
            $conditions['where']    = "s.`id_session` = '{$sessionToCheck}'";
            
            $this->_PDOConn->beginTransaction( );
            $resultSet = $this->select( $fields, $conditions );
            
            if ( count( $resultSet ) > 0 ) {
                
                $this->_PDOConn->commit();
                $id_course  = $resultSet[ 0 ][ 'Course' ];
            } else {
                
                $this->_PDOConn->rollBack();
                $response = array ( "success" =>'false',"message"=>utf8_encode('¡No pudimos completar tu registro! ¿Puedes intentarlo nuevamente?'));
            }
            
        }catch ( PDOException $e ){
            $this->_PDOConn->rollBack();
            $response = array ('success'=>'false','msg'=>'el servicio no esta disponible');
        }
        
        //  Inserta los datos del usuari para el registro al curso
        try{
            $this->setTableName( '`cmv`.`digital_friday_registers`' );
            $fields = array('id');
            
            $this->_PDOConn->beginTransaction();
            $this->_primaryKey  = '`id`';
            
            $dataUpdate = array(
                'id_user_mail'  => $id,
                'id_session'    => $id_course,
                'date_session'  => date( 'd-m-Y H:i:s' )
            );
            
            $this->insert( $dataUpdate );
            
            $success    = $this->getNumRows( );
            
            if ( count( $success ) ) {
                $this->_PDOConn->commit();
                $response = array ( "success" =>'true',"message"=>utf8_encode('&iexcl;Muchas gracias por registrarte. Nos vemos el viernes!'));
            } else {
                
                $this->_PDOConn->rollBack();
                $response = array ( "success" =>'false',"message"=>utf8_encode('¡No pudimos completar tu registro! ¿Puedes intentarlo nuevamente?'));
            }
        }catch( PDOException $e ) {
            
            $this->_PDOConn->rollBack( );
            $response = array ( "success" =>'false', "message"    =>'el servicio no esta disponible');
        }
        
        return $response;
    }
}
