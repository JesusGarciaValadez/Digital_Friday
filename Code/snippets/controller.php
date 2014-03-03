<?php
session_cache_limiter( 'none' ); //Initialize session
session_start( );

header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past

error_reporting ( E_ALL | E_STRICT );
ini_set ( "display_errors", 1 );
date_default_timezone_set( 'America/Mexico_City' );

if (file_exists('config/config.php') ){
    define('CURRENT_PATH',dirname(__FILE__));
    require_once 'config/config.php';
} else {
    exit('no fue posible localizar el archivo de configuración.');
}

function __autoload($className) {
    require_once LIBS_PATH . "/{$className}.php";
}

require_once SNIPPETS_PATH . '/db/connection.php';

$site_url = SITE_URL . 'index.php';

$action = $_GET[ 'action' ];

switch ($action) {
    case 'checkIn':
        $user           = new Usuarios( $dbh );
        $exists         = $user->getExists( $_POST );
        $isRegistered   = $user->isAlreadyRegistered( $exists, $_POST[ 'session' ] );
        if ( $exists ) {
            
            if ( $isRegistered ) {
                
                $success    = json_encode( array ('success'=>'false','msg'=>'Ya estas registrado en este curso. &iexcl;Muchas Gracias!.') );
            } else {
                
                $success    = $user->saveUser( $_POST, $exists, $_POST[ 'session' ] );
                $success    = json_encode( $success );
            }
        } else {
            
            $success    = json_encode( array ('success'=>'false','msg'=>'El correo no existe. Int&eacute;ntalo nuevamente desde tu invitaci&oacute;n.') );
        }
        break;
    default:
        if ( !isset( $_GET ) ) {
            header( "location:{$site_url}:?err=Hubo un error. Inténtalo de nuevo desde tu invitación." );
        }
        break;
}

echo $success;
