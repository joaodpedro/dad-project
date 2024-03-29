var helper = require('../route-security-helper');
var mailer = require('../mailer');

module.exports = function(router, passport, db){
    router.get('/', /*helper.isAdmin,*/ function(req, res){
        db.getUsers(function(err, users){
            return helper.handleResponse(res, err, users);
        });
    });

    router.get('/:id', /*helper.isLoggedIn,*/ function(req, res){
        db.getUserById(req.params.id, function(err, user){
            return helper.handleResponse(res, err, user);
        });
    });

    router.post('/forgot', function(req, res){
        db.getPlatformEmail(function(err, email){
            db.createResetToken(req.body.email, function(err, token){
                if(!err){
                    mailer.sendHtmlMail(email, req.body.email, 'Password reset request', 
                        '<!doctype html><html><head><meta name="viewport" content="width=device-width"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Simple Transactional Email</title><style>@media only screen and (max-width: 620px) {table[class=body] h1 {font-size: 28px !important;margin-bottom: 10px !important;}table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a {font-size: 16px !important;} table[class=body] .wrapper, table[class=body] .article {padding: 10px !important;} table[class=body] .content {padding: 0 !important;}table[class=body] .container {padding: 0 !important;width: 100% !important;}table[class=body] .main {border-left-width: 0 !important;border-radius: 0 !important;border-right-width: 0 !important;}table[class=body] .btn table {width: 100% !important;}table[class=body] .btn a {width: 100% !important;}table[class=body] .img-responsive {height: auto !important;max-width: 100% !important;width: auto !important;}}@media all {.ExternalClass {width: 100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {line-height: 100%;}.apple-link a {color: inherit !important;font-family: inherit !important;font-size: inherit !important;font-weight: inherit !important;line-height: inherit !important;text-decoration: none !important;}.btn-primary table td:hover {background-color: #34495e !important;}.btn-primary a:hover {background-color: #34495e !important;border-color: #34495e !important;}}</style></head><body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6"><tr><td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td><td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; Margin: 0 auto;" width="580" valign="top"><div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"><!-- START CENTERED WHITE CONTAINER --><span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Account password reset request...</span><table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%"><!-- START MAIN CONTENT AREA --><tr><td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top"><table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%"><tr><td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top"><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi there,</p><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">You are receiving this email because you (or someone else) requested a password reset for this account. Click the button below to continue process:</p><table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%"><tbody><tr><td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top"><table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;"><tbody><tr><td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #3498db;" valign="top" align="center" bgcolor="#3498db">'+
                        '<a href="http://' + req.hostname + '/reset/'+token+'?show=true" target="_blank" style="border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #3498db; border-color: #3498db; color: #ffffff;">Reset my password</a> </td></tr></tbody></table></td></tr></tbody></table><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">If the button does not work click, or copy-paste into your browser, this link:'+
                        '<a href="http://' + req.hostname + '/reset/'+token+'?show=true" target="_blank" style="color: #3498db; text-decoration: underline;">'+
                        'http://' + req.hostname + '/reset/'+token+'?show=true</a></p><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">If you did not requested this action disregard the current email.</p></td></tr></table></td></tr><!-- END MAIN CONTENT AREA --></table><!-- START FOOTER --><div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;"><table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%"><tr><td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center"><span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Company Inc, 3 Abbey Road, San Francisco CA 94102</span><br> Don\'t like these emails? <a href="http://i.imgur.com/CScmqnj.gif" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">Unsubscribe</a>.</td></tr><tr><td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">Powered by <a href="http://htmlemail.io" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">HTMLemail</a>.</td></tr></table></div><!-- END FOOTER --><!-- END CENTERED WHITE CONTAINER --></div></td><td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td></tr></table></body></html>"'
                    );
                }
                return helper.handleResponse(res, err, {tkn: token, message:'Mail sent'});
            });
        });
    });

    router.post('/reset', function(req, res){
        db.resetUserPassword(req.body.token, req.body.password, function(err, result){
            return helper.handleResponse(res, err, {rows: result.affectedRows, message:'Password changed'});
        });
    });

    router.put('/:id/password', /*helper.isLoggedIn,*/ function(req, res){
        db.updateUserPassword(req.params.id, req.body, function(err, result){
            return helper.handleResponse(res, err, {rows: result.affectedRows, message:'Password changed'});
        });
    });

    router.put('/:id/email', /*helper.isLoggedIn,*/ function(req, res){
        db.updateUserEmail(req.params.id, req.body.email, function(err, result){
            return helper.handleResponse(res, err, {rows: result.affectedRows, message:'Email changed'});
        });
    });

    router.put('/:id/block', /*helper.isAdmin,*/ function(req, res){
        db.getPlatformEmail(function(err, email){
            db.blockUser(req.params.id, req.body.reason_blocked, function(err, result){
                mailer.sendTextMail(email, req.body.email, 'Blocked account', 'Your account as been blocked by an administrator.\nReason: ' + req.body.reason_blocked);
                return helper.handleResponse(res, err, {rows: result.affectedRows, message:'Blocked'});
            });
        });
    });

    router.put('/:id/reactivate', /*helper.isAdmin,*/ function(req, res){
        db.getPlatformEmail(function(err, email){
            db.reactivateUser(req.params.id, req.body.reason_reactivated, function(err, result){
                mailer.sendTextMail(email, req.body.email, 'Account reactivated', 'Your account as been reactivated by an administrator.\nReason: ' + req.body.reason_reactivated);
                return helper.handleResponse(res, err, {rows: result.affectedRows, message:'Reactivated'});
            });
        });
    });

    router.delete('/:id', /*helper.isAdmin,*/ function(req, res){
        db.deleteUser(req.params.id, function(err, result){
            return helper.handleResponse(res, err, 'Deleted');
        });
    });


    router.put('/:id', /*helper.isLoggedIn,*/ function(req, res){
        db.updateUser(req.body, function(err, result){
            return helper.handleResponse(res, err, 'Updated');
        });
    });

    return router;
}