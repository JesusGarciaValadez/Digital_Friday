<?php
session_cache_limiter( 'none' ); //Initialize session
session_start( );

error_reporting ( E_ALL | E_STRICT );
ini_set ( "display_errors", 1 );

header( "Cache-Control: no-cache, must-revalidate" ); // HTTP/1.1
header( "Expires: Mon, 26 Jul 1997 05:00:00 GMT" ); // Date in the past

if ( file_exists( 'Code/snippets/config/config.php' ) ) {
    define( 'CURRENT_PATH', dirname ( __FILE__ ) );
    require_once CURRENT_PATH . '/Code/snippets/config/config.php';
    require_once SNIPPETS_PATH . '/db/connection.php';
} else {
    exit( 'no fue posible localizar el archivo de configuración.' );
}

function __autoload( $className ) { 
    require_once LIBS_PATH . "/{$className}.php";
}

$usuario        = new Usuarios( $dbh );
$vistaUsuario   = new VistaUsuarios( $dbh );

$site_url = SITE_URL . 'index.php';

if ( $usuario->isValidSession() ) {
        
    $indice = 1;
    $distritosHTML  = '';
    
    View::setViewFilesRepository( CHUNKS_PATH );
    
    $vista = new View( 'index.html' );
    
    $infoUsers = $vistaUsuario->getInfoUser( $_SESSION['mailComparer'] );
    
    foreach ( $infoUsers as $key => $value ) {
        
        foreach ( $value as $user => $valor ) {
            
            $$user  = $valor;
            
            if ( $user == 'Completed' && ( $valor == '1' || $valor == 1 ) ) {
                
                //header( "location:{$site_url}?response=no-editable" );
            }
            $indice++;
        }
    }
    
    $States            = $vistaUsuario->getStates( );
    $Title             = $vistaUsuario->getTitle( );
    
    $vista->setVars( array(
        'id'                => $ID
        ,'mail'             => $Mail
        ,'first_name'       => $First_Name
        ,'last_name'        => $Last_Name
        ,'name'             => $User_Name
        ,'job'              => $Job
        ,'where_are'        => $WhereFrom
        ,'lada'             => $Lada
        ,'phone'            => $Phone
        ,'ext'              => $Ext
        ,'dependency'       => $Dependency
        ,'titulo'           => $Title
        ,'estado'           => $States
        ,'city'             => $City
    ));
    
    $page = $vista->render( );
    
    echo $page;
} else {
    //header( "location:{$site_url}" );
}