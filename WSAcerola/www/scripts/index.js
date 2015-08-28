// 空白のテンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkID=397704
// ページ上のコードをデバッグするには、Ripple で読み込むか、Android デバイス/エミュレーターで読み込みます。アプリを起動し、ブレークポイントを設定します。
// 次に、JavaScript コンソールで "window.location.reload()" を実行します。
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
      document.addEventListener('pause', onPause.bind(this), false);
      document.addEventListener('resume', onResume.bind(this), false);
    };

    function onPause() {
    };

    function onResume() {
    };
} )();