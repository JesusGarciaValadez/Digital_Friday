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

$usuario    = new Usuarios( $dbh );

$site_url = SITE_URL . 'index.php';

if ( $usuario->isValidSession() ) {
    
    View::setViewFilesRepository( CHUNKS_PATH );
    
    $vista = new View( 'index.html' );
    
    $vista->setVars( array(
        'session'   => $_GET[ 's' ],
        'mail'      => $_GET[ 'm' ]
    ) );
    
    $page = $vista->render( );
    
    echo $page;
} else {
    
    header( "location:{$site_url}?&m=none&s=?&err=Tu correo no esta registrado. Intentalo de nuevo desde tu invitación." );
}