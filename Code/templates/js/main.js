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
    
    var _CMVDG    = window._CMVDG, 
    
    // Use the correct document accordingly with window argument (sandbox)
    document = window.document,
    location = window.location,
    navigator = window.navigator,
    
    // Map over CMVDG in case of overwrite
    _CMVDG    = window.CMVDG;
    
    // Define a local copy of CMVDG
    CMVDG = function() {
        if ( !( this instanceof CMVDG ) ) {
            
            // The CMVDG object is actually just the init constructor 'enhanced'
            return new CMVDG.fn.init();
        }
        return CMVDG.fn.init();
    };
    
    CMVDG.overlay;
    
    //  Object prototyping
    CMVDG.fn = CMVDG.prototype = {
        /**
         *
         *  @function:  !constructor
         *  @description:   Constructor method
         *  @author: @_Chucho_
         *
         */
        //  Método constructor
        constructor:    CMVDG, 
        /**
         *
         *  @function:  !init
         *  @description:   Inicializer method
         *  @author: @_Chucho_
         *
         */
        //  !Método inicializador
        init:   function ( ) {}, 
        /**
         *
         *  @function:  !makesUniform
         *  @description:   Makes the uniform effect to radius and checkbox
         *  @params jQuery selector.- A jQuery Selector 
         *  @see:   http://uniformjs.com/
         *  @author: @_Chucho_
         *
         */
        //  !Crea un efecto para poder dar estilos a los elementos checkbox, 
        //  radio, file y select
        makesUniform:   function ( selector ) {
            
            _selector       = ( typeof( selector ) == "undefined" ) ? "*" : selector;
            _selector       = ( typeof( _selector ) == "object" ) ? _selector : $( _selector );
            
            _selector.uniform();
        }, 
        /**
         *
         *  @function:  !anchorMenu
         *  @description:   Anchor the menu
         *  @params jQuery selectorToApply.- A jQuery Selector 
         *  @params Object toFix.- An object with css properties to apply to the
         *                         jQuery selector
         *  @params Object toDeFix.- An object with css properties to apply to 
         *                         the jQuery selector
         *  @author: @_Chucho_
         *
         */
        //  !Ancla el menú cuando a una altura determinada mediante css
        anchorMenu: function ( selectorToApply, offsetTop, classToFix, classToDeFix ) {
            
            CMVDG.tool = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            
            _selector       = ( typeof( selector ) == "undefined" ) ? "*" : selector;
            _selector       = ( typeof( _selector ) == "object" ) ? _selector : $( _selector );
            
            _offsetTop      = ( offsetTop == "" ) ? 0 : offsetTop;
            _offsetTop      = ( typeof( _offsetTop ) == "string" ) ? parseInt( _offsetTop ) : ( typeof( _offsetTop ) == "number" ) ? _offsetTop : parseInt( _offsetTop );
            
            _classToFix     = ( typeof( _classToFix ) == "object" ) ? classToFix : {};
            _classToDeFix   = ( typeof( _classToDeFix ) == "object" ) ? classToDeFix : {};
            
            if ( CMVDG.tool >= _offsetTop ) {
                
                _selectorToApply.css( toFix );
            } else {
                
                _selectorToApply.css( toDeFix );
            }
        },
        /**
         *
         *  @function:  !validateContact
         *  @description:   Makes the validation of the contact form
         *  @see:   http://bassistance.de/jquery-plugins/jquery-plugin-validation/ || 
         *          http://docs.jquery.com/Plugins/Validation
         *  @author: @_Chucho_
         *
         */
        //  !Validación del formulario de contacto.
        validateForms:    function ( rule, messages ) {
            
            var _rule       = ( typeof( rule ) == 'object' ) ? rule : {};
            var _message    = ( typeof( messages ) == 'object' ) ? messages : {};
            
            var formActive = $( 'form' ).validate( { 
                onfocusout: false,
                onclick: true, 
                onkeyup: false,
                onsubmit: true, 
                focusCleanup: true, 
                focusInvalid: false, 
                errorClass: "error", 
                validClass: "valid", 
                errorElement: "label", 
                ignore: "", 
                /*showErrors: function( errorMap, errorList ) {
                    $('#message').empty().removeClass();
                    $("#message").html('<p>Error al ingresar la información.</p><p>Verifique que sus datos están correctos o que no falte ningún dato.</p><p>Por favor, vuelvalo a intentar.</p>');
                    $('#message').addClass('wrong').show('fast', function(){
                        $('#message').show('fast');
                    });
                    this.defaultShowErrors();
                },*/
                errorPlacement: function(error, element) {
                    error.prependTo( element.parent() );
                },
                //debug:true, 
                rules: _rule,
                messages: _message, 
                ignore: 'textarea', 
                highlight: function( element, errorClass, validClass ) {
                    $( element ).parent().addClass( 'error_wrapper' );
                },
                unhighlight: function( element, errorClass ) {
                    $( element ).parent().removeClass( 'error_wrapper' );
                }, 
                submitHandler: function( form ) {
                    // Form submit
                    $( form ).ajaxSubmit( {
                        //    Before submitting the form
                        beforeSubmit: function showRequestLogin( arr, form, options ) {
                            
                            $('.error_indicator').remove();
                            $( ".spinner" ).fadeIn( 300 );
                        },
                        //  !Function for handle data from server
                        success: function showResponseLogin( responseText, statusText, xhr, form ) {
                            
                            //console.log(responseText.success);
                            responseText    = $.parseJSON( responseText );
                            
                            $( ".spinner" ).fadeOut( 300 );
                            
                            if( responseText && ( responseText.success == 'true' || responseText.success == true ) ) {
                                
                                $( form ).fadeOut( 300, function () {
                                    
                                    
                                } );
                            } else {
                                
                                
                            }
                        }, 
                        resetForm: false, 
                        clearForm: false, 
                        //   If something is wrong
                        error: function( jqXHR, textStatus, errorThrown ) {
                            //console.log(textStatus);
                            //console.log(errorThrown);
                        }, 
                        cache: false
                    } );
                }, 
                /*invalidHandler: function(form, validator) {
                    var errors = validator.numberOfInvalids();
                    if (errors) {
                        var message = errors == 1 ? 'You missed 1 field. It has been highlighted' : 'You missed ' + errors + ' fields. They have been highlighted';
                        $("div#summary").html(message);
                        $("div#summary").show();
                    } else {
                        $("div#summary").hide();
                    }
                }*/
            } ); 
        }, 
        /**
         *
         *  @function:  doOverlay
         *  @description:  Make and overlay effect
         *  @params jQuery selector.- A jQuery Selector 
         *  @params Object options.- A JSON object with the options to make a 
         *                           target element a jqdock Element
         *  @author: @_Chucho_
         *  @see:   http://jquerytools.org
         *
         */
        //  !Hace un efecto de overlay sobre un elemento determinado
        doOverlay:  function ( selector, options ) {
            var _selector   = ( typeof( selector ) == "string" )? $( selector ) : ( ( typeof( selector ) == "object" )? selector : $( '*' ) );
            var _options    = ( typeof( options )   == "object" )? options : {};
            
            _selector.overlay( _options );
        }, 
        //  !Abre un cuadro de diálogo con un mensaje
        openAlert:  function ( title, markupMessage ) {
            
            var _title      = ( title == "" || title == undefined ) ? "Error" : title;
            var _message    = ( markupMessage == "" || markupMessage == undefined ) ? "<p>Hubo un error inesperado.</p>" : markupMessage;
            
            $( '.alert_box h2' ).text( _title );
            $( '.alert_box' ).append( _message );
            //CMVDG.overlay.load();
            $( '.alert_trigger' ).click( );
            $( '.alert_box' ).centerHeight( );
            $( '.alert_box' ).centerWidth( );
            $( '.alert_background' ).fadeIn( 50, function (  ) {
                
                $( '.alert_box' ).fadeIn( 100 );
            } );
        }, 
        /**
         *
         *  @function:  !closeAlert
         *  @description:   Close an alert box with a message
         *  @see:   http://bassistance.de/jquery-plugins/jquery-plugin-validation/ || 
         *          http://docs.jquery.com/Plugins/Validation
         *  @author: @_Chucho_
         *
         */
        //  !Cierra un cuadro de diálogo con un mensaje
        closeAlert:  function ( ) {
            
            CMVDG.overlay.close();
            /*$( '.alert_box' ).fadeOut( 'fast' );
            $( '.alert_background' ).fadeOut( 'fast' );
            $( '.alert_box h4' ).text( '' );
            $( '.alert_box p' ).remove( );
            $( '.alert_box form' ).remove( );
            $( '.alert_box table' ).remove( );
            $( '.alert_box div' ).remove( );
            $( '.alert_box button' ).remove( );*/
        }, 
        /**
         *
         *  @function:  !smoothScroll
         *  @description:   Do smooth scroll for the anchors in menu
         *  @params jQuery selector.- A jQuery Selector 
         *  @params Number durationInSec.- A number to indicate the duration of 
         *                                 the animation
         *  @see:   http://flesler.blogspot.com/2007/10/jqueryscrollto.html
         *  @author: @_Chucho_
         *
         */
        //  !Realiza el efecto para dar la impresión de scroll "suavizado"
        smoothScroll:   function ( selector, durationInSec ) {
            
            _selector       = ( typeof( selector ) == "undefined" ) ? "*" : selector;
            _selector       = ( typeof( _selector ) == "object" ) ? _selector : ( typeof( _selector ) == "number" ) ? _selector : $( _selector );
            
            _durationInSec  = ( durationInSec == "" ) ? 1000 : durationInSec;
            _durationInSec  = ( typeof( _durationInSec ) == "string" ) ? parseInt( _durationInSec ) : _durationInSec;
            _durationInSec  = ( typeof( _durationInSec ) != "number" ) ? parseInt( _durationInSec ) : _durationInSec;
            
            if ( typeof( _selector ) == "object" ) {
                
                _scrollYOffset  = _selector.offset().top;
                _scrollYOffset  = Math.ceil ( Number( _scrollYOffset ) );
            } else if ( typeof( _selector ) == "number" ) {
                
                _scrollYOffset  = _selector;
            }
            
            $.scrollTo( _scrollYOffset, { 
                duration: _durationInSec, 
                axis: 'y'
            } );
        }, 
        /**
         *
         *  @function:  !toggleValue
         *  @description:   Does toggle if the input have a value or if doesn't
         *  @params jQuery selector.- A jQuery Selector 
         *  @params String valueChange.- A String with the value to change or preserve
         *  @author: @_Chucho_
         *
         */
        //  !Revisa si el valor de un input es el original o no y lo preserva o 
        //  respeta el nuevo valor.
        toggleValue:    function ( selector, valueChange ) {
            
            _selector       = ( typeof( selector ) == "undefined" ) ? "*" : selector;
            _selector       = ( typeof( _selector ) == "object" ) ? _selector : $( _selector );
            
            _valueChange  = ( valueChange == "" ) ? "" : valueChange;
            _valueChange  = ( typeof( _valueChange ) == "string" ) ? _valueChange : ( typeof( _valueChange ) == "number" ) ? parseInt( _valueChange ) : _valueChange;
            
            var _placeholder;
            
            if ( _selector.attr( 'placeholder' ) != undefined ) {
                
                _placeholder = String ( _selector.attr( 'placeholder' ) ).toLowerCase();
            } else {
                
                _placeholder = String ( _selector.val( ) ).toLowerCase();
            }
            
            /*if ( ( _placeholder == "" ) || ( _placeholder == _valueChange ) ) {
                
                _selector.css( { 
                    color: '#aaa'
                } );
            }*/
            
            _selector.on( {
                blur: function ( e ) {
                    
                    _comment = String( $( e.currentTarget ).val() ).toLowerCase();
                    if ( ( _comment == _placeholder ) || ( _comment == "" ) ) {
                        
                        $( e.currentTarget ).val( valueChange );
                        return false;
                    }
                },
                focus: function ( e ) {
                    
                    _comment = String( $( e.currentTarget ).val() ).toLowerCase();
                    if ( _comment == _placeholder ) {
                        
                        $( e.currentTarget ).val( '' );
                        return false;
                    }
                }
            } );
        }, 
        /**
         *
         *  @function:  !toggleClass
         *  @description:   Toggle an HTML class
         *  @params jQuery selector.- A jQuery Selector 
         *  @params String className.- A class to toggle to the target
         *  @author: @_Chucho_
         *
         */
        //  !Hace toggle de una clase a un selector específico
        toggleClass: function ( selector, className ) {
            
            _selector       = ( typeof( selector )  == "undefined" ) ? "*" : selector;
            _selector       = ( typeof( _selector ) == "object" )    ? _selector : $( _selector );
            _class          = ( typeof( className ) == "undefined" ) ? ".active" : className;
            _class          = ( typeof( _class )    == "string" )    ? _class : String( _class );
            
            if ( selector.exists() ) {
                
                _selector.toggleClass( _class );
            }
        }, 
        getCenterWidth: function ( selector ) {
            
            var winWidth;
            _selector       = ( typeof( selector )  == "undefined" ) ? "*" : selector;
            _selector       = ( typeof( _selector ) == "object" )    ? _selector : $( _selector );
            
            if ( $.browser.msie && $.browser.version == '8.0' ) {
                
                winWidth    = $(window).width() / 2;
            } else {
                
                winWidth    = window.innerWidth / 2;
            }
            
            var elemWidth   = $( _selector ).width() / 2;
            
            if ( parseInt( winWidth - elemWidth ) < 100 ) {
                
                winWidth    = $( 'body' ).innerWidth() / 2;
            }
            
            return elemLeft    = winWidth - elemWidth;
        }
    };
    
    // Give the init function the CMVDG prototype for later instantiation
    CMVDG.fn.init.prototype = CMVDG.fn;
    
    CMVDG = CMVDG.fn;
    
    // Expose CMVDG to the global object
    
    window.CMVDG  = CMVDG;
    
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
            
            var pointOne    = CMVDG.getCenterWidth( $( "#six .points" ).eq( 0 ) ) - 85;
            var pointTwo    = CMVDG.getCenterWidth( $( "#six .points" ).eq( 1 ) ) + 25;
            
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
                
                CMVDG.smoothScroll( '#home', 300 );
                
                $( 'nav ul li' ).removeClass( 'active' );
                CMVDG.toggleClass( $( e.currentTarget ).parent(), 'active' );
            } );
            $( 'a[title="Contacto"]' ).on( 'click', function ( e ) {
                
                e.preventDefault();
                e.stopPropagation();
                
                var topOffset   = $( '#contact_title' ).offset().top - 55;
                CMVDG.smoothScroll( topOffset, 300 );
                
                $( 'nav ul li' ).removeClass( 'active' );
                CMVDG.toggleClass( $( e.currentTarget ).parent(), 'active' );
            } );
        }
        
        //  !Crea una instancia de jQuery Overlay
        if ( $( '.alert_box' ).exists() ) {
            
            CMVDG.doOverlay( $( 'a.alert_trigger' ), {
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
            
            CMVDG.overlay    = $( '.alert_trigger' ).data( 'overlay' );
            
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
            CMVDG.doOverlay( 'img[rel]', {
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
            
            CMVDG.makesUniform( 'select' );
            
            CMVDG.toggleValue( '#contact_name', 'Nombre' );
            CMVDG.toggleValue( '#contact_business', 'Empresa' );
            CMVDG.toggleValue( '#contact_phone', 'Teléfono' );
            CMVDG.toggleValue( '#contact_mail', 'Email' );
            
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
            
            CMVDG.validateForms( rules, messages );
        }
    } );
    
})( jQuery, window, document );