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
    
    var _CMVDF    = window._CMVDF, 
    
    // Use the correct document accordingly with window argument (sandbox)
    document = window.document,
    location = window.location,
    navigator = window.navigator,
    
    // Map over CMVDF in case of overwrite
    _CMVDF    = window.CMVDF;
    
    // Define a local copy of CMVDF
    CMVDF = function() {
        if ( !( this instanceof CMVDF ) ) {
            
            // The CMVDF object is actually just the init constructor 'enhanced'
            return new CMVDF.fn.init();
        }
        return CMVDF.fn.init();
    };
    
    CMVDF.overlay;
    CMVDF.closer;
    CMVDF.tool;
    
    //  Object prototyping
    CMVDF.fn = CMVDF.prototype = {
        /**
         *
         *  @function:  !constructor
         *  @description:   Constructor method
         *  @author: @_Chucho_
         *
         */
        //  Método constructor
        constructor:    CMVDF, 
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
            
            CMVDF.tool = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            
            _selector       = ( typeof( selector ) == "undefined" ) ? "*" : selector;
            _selector       = ( typeof( _selector ) == "object" ) ? _selector : $( _selector );
            
            _offsetTop      = ( offsetTop == "" ) ? 0 : offsetTop;
            _offsetTop      = ( typeof( _offsetTop ) == "string" ) ? parseInt( _offsetTop ) : ( typeof( _offsetTop ) == "number" ) ? _offsetTop : parseInt( _offsetTop );
            
            _classToFix     = ( typeof( _classToFix ) == "object" ) ? classToFix : {};
            _classToDeFix   = ( typeof( _classToDeFix ) == "object" ) ? classToDeFix : {};
            
            if ( CMVDF.tool >= _offsetTop ) {
                
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
                                
                                $( '.alert_box' ).addClass( 'thank_you_message' );
                                var _title   = '¡Felicidades!';
                                var _message = '<p>' + responseText.msg + '</p>';
                                CMVDF.openAlert( _title, _message );
                            } else {
                                
                                $( '.alert_box' ).addClass( 'error_message' );
                                var _title   = '¡Lo sentimos!';
                                var _message = '<p>' + responseText.msg + '</p>';
                                CMVDF.openAlert( _title, _message );
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
            $( '.alert_trigger' ).click( );
            $( '.alert_box' ).centerHeight( );
            $( '.alert_box' ).centerWidth( );
            $( '.alert_background' ).fadeIn( 50, function (  ) {
                
                $( '.alert_box' ).fadeIn( 200 );
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
            
            //CMVDF.overlay.close();
            $( '.alert_box' ).fadeOut( 200, function () {
                
                $( '.alert_background' ).fadeOut( 50, function () {
                    
                    $( '.alert_box h4' ).text( '' );
                    $( '.alert_box p' ).remove( );
                    $( '.alert_box form' ).remove( );
                    $( '.alert_box table' ).remove( );
                    $( '.alert_box div' ).remove( );
                    $( '.alert_box button' ).remove( );
                } );
            } );
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
    
    // Give the init function the CMVDF prototype for later instantiation
    CMVDF.fn.init.prototype = CMVDF.fn;
    
    CMVDF = CMVDF.fn;
    
    // Expose CMVDF to the global object
    
    window.CMVDF  = CMVDF;
    
})( jQuery, window, document );