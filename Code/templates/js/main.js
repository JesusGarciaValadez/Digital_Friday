/**
 *
 *  @function
 *  @description:   Anonimous function autoexecutable
 *  @params jQuery $.- An jQuery object instance
 *  @params window window.- A Window object Instance
 *  @author: @_Chucho_
 *
 */
(function ( $, window, document, undefined ) {
    
    //  When DOM is loaded
    $( function ( ) {
        
        if ( $( ".loader" ).exists() ) {
            
            $( '.alert_background' ).fadeOut( 300 );
            $( ".loader" ).fadeOut( 300 );
        }
        
        //  Control del background
        if ( $( "h1" ).exists() ) {
            
            $( "h1" ).centerWidth();
        }
        if ( $( ".rocket" ).exists() ) {
            
            $( ".rocket" ).centerWidth();
        }
        if ( $( ".session" ).exists() ) {
            
            $( ".session" ).centerWidth();
        }
        if ( $( ".vertical_points" ).exists() ) {
            
            $( ".vertical_points" ).centerWidth();
        }
        if ( $( ".arrow" ).exists() ) {
            
            $( ".arrow" ).centerWidth();
        }
        if ( $( ".hands" ).exists() ) {
            
            $( ".hands" ).centerWidth();
        }
        if ( $( "#DG_Logo" ).exists() ) {
            
            $( "#DG_Logo" ).centerWidth();
        }
        if ( $( "#six .points" ).exists() ) {
            
            var pointOne    = CMVDF.getCenterWidth( $( "#six .points" ).eq( 0 ) ) - 85;
            var pointTwo    = CMVDF.getCenterWidth( $( "#six .points" ).eq( 1 ) ) + 25;
            
            $( "#six .points" ).eq( 0 ).css( { 
                left: pointOne + 'px'
            } );
            $( "#six .points" ).eq( 1 ).css( { 
                left: pointTwo + 'px'
            } );
        }
        if ( $( "h3" ).exists() ) {
            
            $( "h3" ).centerWidth();
        }
        if ( $( "h4" ).exists() ) {
            
            $( "h4" ).centerWidth();
        }
        if ( $( "form" ).exists() ) {
            
            $( "form" ).centerWidth();
        }
    } );
    
    //  When DOM is ready
    $( document ).on( 'ready', function ( e ) {
        
        if ( $( '#nav' ).exists() ) {
            
            $( 'a[title="Home"]' ).on( 'click', function ( e ) {
                
                e.preventDefault();
                e.stopPropagation();
                
                CMVDF.smoothScroll( '#home', 300 );
                
                $( 'nav ul li' ).removeClass( 'active' );
                CMVDF.toggleClass( $( e.currentTarget ).parent(), 'active' );
            } );
            $( 'a[title="Contacto"]' ).on( 'click', function ( e ) {
                
                e.preventDefault();
                e.stopPropagation();
                
                var topOffset   = $( '#contact_title' ).offset().top - 55;
                CMVDF.smoothScroll( topOffset, 300 );
                
                $( 'nav ul li' ).removeClass( 'active' );
                CMVDF.toggleClass( $( e.currentTarget ).parent(), 'active' );
            } );
        }
        
        //  !Crea una instancia de jQuery Overlay
        if ( $( '.alert_box' ).exists() ) {
            
            CMVDF.doOverlay( $( 'a.alert_trigger' ), {
                effect: 'apple',
                close: $( '.alert_box a.close' ),
                closeOnClick: true,
                closeOnEsc: true, 
                speed: 'normal',
                fixed: false,
                onBeforeLoad: function ( e ) {
                    
                    $( '.alert_background' ).height( '100%' );
                    $( '.alert_box' ).centerWidth();
                    $( '.alert_box' ).centerHeight();
                },
                onLoad: function() {
                    $( '.alert_background' ).fadeIn( 100 );
                },
                onBeforeClose:  function ( ){
                    
                    $( '.alert_box' ).fadeOut( 10, function ( ) {
                        
                        $( '.alert_background' ).fadeOut( 10 );
                        $( '.alert_box h4' ).text( '' );
                        $( '.alert_box p' ).remove( );
                        $( '.alert_box form' ).remove( );
                        $( '.alert_box table' ).remove( );
                        $( '.alert_box div' ).remove( );
                        $( '.alert_box button' ).remove( );
                        $( '.alert_box div.confirm' ).remove( );
                    } );
                },
                onClose: function ( e ) {
                    
                }
            } );
            
            CMVDF.overlay    = $( '.alert_trigger' ).data( 'overlay' );
            
            $( '.alert_background' ).height( $( 'body' ).height() );
        }
        
        //  Crea una instancia de jQuery Overlay para el home de descubreone.mx
        //  Calcula la distancia entre el margen izquierdo para posicionar
        //  la capa del video. Si en menor de 0 (ocurre en iPhone) utiliza 
        //  el ancho del body en vez del ancho de la ventana para hacer 
        //  el cálculo
        if ( $( '.overlay.black' ).exists() ) {
            
            $( '.overlay.black' ).centerWidth();
            
            if ( $( '.video' ).exists() ) {
                
                var myVideo = document.getElementsByTagName( 'video' )[ 0 ];
            }
            CMVDF.doOverlay( 'img[rel]', {
                effect: 'apple', 
                // custom top position
                //top: 260,
                // some mask tweaks suitable for facebox-looking dialogs
                mask: {
                    // you might also consider a "transparent" color for the mask
                    color: '#FFF',
                    // load mask a little faster
                    loadSpeed: 200,
                    // very transparent
                    opacity: 0.5
                },
                // disable this for modal dialog-type of overlays
                closeOnClick: true,
                closeOnEsc: true, 
                // load it immediately after the construction
                load: true, 
                onBeforeLoad: function ( e ) {
                    
                }, 
                onLoad: function ( e ) {
                   
                    if ( myVideo && myVideo.paused ) {
                        
                        myVideo.play();
                    }
                }, 
                onBeforeClose: function ( e ) {
                    
                    var player;
                    function onYouTubeIframeAPIReady() {
                        
                        player  = new window.YT.Player( 'ytplayer', {
                            events: {
                                'onReady': onPlayerReady,
                                'onStateChange': onPlayerStateChange
                            }
                        });
                    }
                    
                    function onPlayerReady( event ) {
                        
                        event.target.playVideo();
                    }
                    
                    var done = false;
                    function onPlayerStateChange( event ) {
                        
                        if ( event.data == YT.PlayerState.PLAYING ) {
                            
                            stopVideo();
                        }
                    }
                    function stopVideo() {
                        
                        player.stopVideo();
                    }
                }, 
                onClose: function ( e ) {
                    
                    if ( myVideo ) {
                        
                        myVideo.pause();
                    }
                    /*if ( $( '#exposeMask:visible' ).is( ':visible' ) && $( 'object,embed' ).exists() ) {
                        
                        $( 'object,embed' ).css( {
                            display: "none", 
                            opacity: "0", 
                            filter: "alpha(opacity=0)", 
                            visibility: "none"
                        } );
                    }*/
                }
            } );
            
            $( window ).on( {
                resize: function ( e ) {
                    
                    $( '.overlay.black' ).centerWidth();
                },
                touchstart: function ( e ) {
                    
                    $( '.overlay.black' ).centerWidth();
                }, 
                touchend: function ( e ) {
                    
                    $( '.overlay.black' ).centerWidth();
                }
            } );
        }
        
        // Validación de los formularios
        if ( $( 'form' ).exists() ) {
            
            CMVDF.makesUniform( 'select' );
            
            CMVDF.toggleValue( '#contact_name', 'Nombre' );
            CMVDF.toggleValue( '#contact_business', 'Empresa' );
            CMVDF.toggleValue( '#contact_phone', 'Teléfono' );
            CMVDF.toggleValue( '#contact_mail', 'Email' );
            
            var rules   = { 
                    one: {
                        required: true
                    }, 
                    two: {
                        required: true
                    }, 
                    three: {
                        required: true
                    }, 
                    four: {
                        required: true
                    }, 
                    five: {
                        required: true
                    }, 
                    six: {
                        required: true
                    }, 
                    seven: {
                        required: true
                    }, 
                    eight: {
                        required: true
                    }, 
                    nine: {
                        required: true
                    }, 
                    ten: {
                        required: false,
                        maxlength: 255
                    }, 
                    eleven: {
                        required: true
                    }, 
                    twelve: {
                        required: true
                    }, 
                    thirteen: {
                        required: true
                    }, 
                    fourteen: {
                        required: false,
                        maxlength: 255
                    }
                };
            var messages    = {
                    one: "Por favor, selecciona una opción", 
                    two: "Por favor, selecciona una opción", 
                    three: "Por favor, selecciona una opción", 
                    four: "Por favor, selecciona una opción", 
                    five: "Por favor, selecciona una opción", 
                    six: "Por favor, selecciona una opción", 
                    seven: "Por favor, selecciona una opción", 
                    eight: "Por favor, selecciona una opción", 
                    nine: "Por favor, selecciona una opción", 
                    ten: "Por favor, selecciona una opción", 
                    eleven: "Por favor, selecciona una opción", 
                    twelve: "Por favor, selecciona una opción", 
                    thirteen: "Por favor, selecciona una opción", 
                    fourteen: "Por favor, selecciona una opción", 
                    required: "Por favor, selecciona una opción", 
                    minlength: "Por favor, haga su respuesta más amplia.", 
                    maxlength: "Por favor, acorte su respuesta", 
                    email: "Escriba un email válido",
                    number: "Escriba solo números", 
                    digits: "Escriba solo números", 
                }
            
            CMVDF.validateForms( rules, messages );
        }
    } );
    
})( jQuery, window, document );