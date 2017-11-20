@echo off
set KEYTOOL=C:\DevTools\jdk1.8.0_131_x64\bin\keytool.exe
set OPENSSL=F:\OpenSSL\openssl.exe
REM %KEYTOOL% -exportcert -alias NguyenHoangAN -keystore %HOMEPATH%\.android\debug.keystore | %OPENSSL% sha1 -binary | %OPENSSL% base64
REM keytool -exportcert -alias androiddebugkey -keystore %HOMEPATH%\.android\debug.keystore | openssl sha1 -binary | openssl base64
REM keytool -exportcert -alias androiddebugkey -keystore %HOMEPATH%\.android\debug.keystore | openssl sha1 -binary | openssl base64


call %KEYTOOL% -list -printcert -jarfile E:\training\Ionic2\ionic-snapaday\platforms\android\build\outputs\apk\android-debug.apk