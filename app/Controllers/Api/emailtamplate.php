<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <title>Shipping mail template</title>
        <meta content="text/html; charset=ISO-8859-1" http-equiv="Content-Type" />
        <meta content="width=device-width" name="viewport" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
            <style>
                html, body {
                    margin: 0 auto !important;
                    padding: 0 !important;
                    height: 100% !important;
                    width: 100% !important;
                }
                @media only screen and (max-width: 600px) {
                    table{max-width:100%;width:100% !important;}
                    body{overflow-x: hidden;}
                    td.esd-block-image ,td.es-left,td.esd-block{width: 100% !important;float: left;text-align: center;padding: 5px 0 !important;}
                    td.esd-block-image img ,td.es-left img{margin: 0 auto !important;width: 100%;margin: 0 auto;}
                    td.esd-block img{margin: 0 auto;}
                    .es-hidden{display: none;}
                    .content-tbl{padding: 0 12px;overflow-x: hidden;}
                }
            </style>
    </head>

    <body style="background: #f8f6f1;font-family: 'Roboto', sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="email-content" style="margin: 0 auto;width: 600px;border-spacing: 0;border-collapse: collapse;padding: 0;background: #fff;max-width: 100%;">
            <tbody>
                <tr>
                    <td style="padding: 0 18px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr align="center">
                                    <td>
                                        <table class="content-tbl" align="center" border="0" cellpadding="0" cellspacing="0" style="width: 600px;max-width: 100%;">
                                            <tbody style="text-align: center;">
                                                <tr style="padding: 0;">
                                                    <td style="padding: 220px 0 27px;">
                                                        <!--<b><span style="font-size: 24px;color: #222;line-height: 27px;letter-spacing: 0;text-transform: uppercase;margin: 0;">YOUR SAVED POSTER</span></b>-->
                                                    </td>
                                                </tr>
                                                <tr style="padding: 0;">
                                                    <td style="padding-bottom: 26px;">
                                                        <p  style="letter-spacing: 0;font-size: 16px;color: #222;font-weight: 400;line-height: 21px;margin: 0;">Don't worry, we will continue to save your design for another 24 hours.</p>
                                                    </td>
                                                </tr>						
                                            </tbody>
                                        </table>
                                        <table class="content-tbl" align="center" border="0" cellpadding="0" cellspacing="0" style="padding-bottom: 300px;width: 600px;max-width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table style="background: #000;width: 100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="min-width: 100%;padding: 25px 15px;">
                                                                        <p style="text-align: center;font-size: 15px;margin: 0;">
                                                                            <b>
                                                                                <span style="font-size: 12px;letter-spacing: 1px;color: #fff;">
                                                                                    <a href="<?= $data['baseurl'] . "?" . http_build_query($data['postdata']) ?>">
                                                                                        <span style="color:#fff;text-decoration:none">Complete your order</span>
                                                                                    </a>
                                                                                </span>
                                                                            </b>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 600px;max-width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td style="padding: 42px 0 0;border-top: solid #b1b1b1 1px;">
                                                        <table align="center" border="0" cellpadding="0" cellspacing="0" style="padding-bottom: 22px;">
                                                            <tbody>
                                                                <tr style="text-align: center;">

                                                                    <td style="padding-right: 30px;">
                                                                        <a href="#" target="_blank">
                                                                            <img src="<?= base_url("assets/image/fb.png") ?>" style="display:block;margin: 0 auto" border="0" width="48">
                                                                        </a>
                                                                    </td>
                                                                    <td style="padding-right: 30px;">
                                                                        <a href="#" target="_blank">
                                                                            <img src="<?= base_url("assets/image/insta.png") ?>" style="display:block;margin: 0 auto" width="48" border="0">
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 9px 0;">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <p style="font-size: 10px;font-weight: 400;line-height: 15px;overflow-wrap: break-word;text-align: center;color: #222;margin: 0;">
                                                                            <span>
                                                                                No longer want to receive these emails?<a href="#"><span style="color: #000;">Unsubscribe</span></a>.<br>
                                                                                    The Birth Poster Birger Jarlsgatan 20 Stockholm, Stockholm 11434
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
</html>