<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $isChange ? __('mail.email_change_subject') : __('mail.verification_subject') }}</title>
</head>

<body
    style="margin: 0; padding: 0; background-color: #181623; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
        style="background-image: linear-gradient(187.16deg, #181623 0.07%, #191725 52.03%, #0d0b14 99.49%); background-color: #181623; background-repeat: no-repeat; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0"
                    style="max-width: 520px; width: 100%; text-align: center; padding: 40px 32px;">

                    <tr>
                        <td align="center" style="padding-bottom: 24px;">
                            <img src="{{ $message->embed(public_path('images/logo.png')) }}"
                                alt="{{ strtoupper(config('app.name')) }}"
                                style="display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none;" />
                        </td>
                    </tr>

                    <tr>
                        <td align="center">
                            <span
                                style="text-transform: uppercase; font-weight: 500; font-size: 12px; color:#ddccaa">movie
                                quotes</span>
                        </td>
                    </tr>

                    <tr align="start">
                        <td style="padding-top: 76px; margin-bottom: 24px;">
                            <p style="margin: 0; font-size: 15px; line-height: 1.5; color: #ffffff;">
                                {{ __('mail.verification_greeting', ['name' => $username]) }}
                            </p>
                        </td>
                    </tr>

                    <tr align="start">
                        <td align="left" style="padding-bottom: 28px;">
                            <div style="margin: 0; font-size: 15px; line-height: 1.5; color: #ffffff;">
                                {{ $isChange ? __('mail.email_change_join') : __('mail.verification_join') }}
                            </div>
                        </td>
                    </tr>

                    <tr align="start">
                        <td style="padding-top: 8px;">
                            <a href="{{ $url }}"
                                style="display: inline-block; background-color: #e31221; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 12px 36px; border-radius: 8px; text-align: center;">
                                {{ $isChange ? __('mail.email_change_action') : __('mail.verification_action') }}
                            </a>
                        </td>
                    </tr>

                    <tr align="start">
                        <td style="padding-top: 28px;">
                            <p style="margin: 0 0 8px 0; font-size: 13px; line-height: 1.5; color: #ffffff;">
                                {{ __('mail.verification_copy') }}
                            </p>
                            <p
                                style="margin: 0; font-size: 13px; line-height: 1.5; color: #ddccaa; word-break: break-all;">
                                <a href="{{ $url }}" target="_blank" rel="noopener"
                                    style="color: #ddccaa; text-decoration: none; word-break: break-all;">{{ $url }}</a>
                            </p>
                        </td>
                    </tr>

                    <tr align="start">
                        <td style="padding-top: 24px;">
                            <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #ffffff;">
                                {{ __('mail.verification_support') }}
                                <a href="mailto:{{ __('mail.verification_support_email') }}"
                                    style="color: #ffffff; text-decoration: none;">
                                    {{ __('mail.verification_support_email') }}
                                </a>
                            </p>
                            <p style="color: #ffffff;margin: 8px 0 0 0; font-size: 13px; line-height: 1.5; ">
                                {{ __('mail.verification_crew') }}
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>

</html>