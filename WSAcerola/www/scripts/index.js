// 空白のテンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkID=397704
// ページ上のコードをデバッグするには、Ripple で読み込むか、Android デバイス/エミュレーターで読み込みます。アプリを起動し、ブレークポイントを設定します。
// 次に、JavaScript コンソールで "window.location.reload()" を実行します。

var iProcessing;

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
      document.addEventListener('pause', onPause.bind(this), false);
      document.addEventListener('resume', onResume.bind(this), false);

      WinJS.UI.Pages.define('index.html', {
        ready: function () {
          iProcessing = Processing.getInstanceById("timer");
        }
      });

      WinJS.Namespace.define('Main', {
        operation: WinJS.UI.eventHandler(function (e) {
          var command = e.currentTarget;
          if (command.winControl) {
            switch (command.winControl.id) {
              case "opPlayPause":
                iProcessing.playpause();
                break;
              case "opReset":
                iProcessing.reset();
                break;
              case "opSettings":

                break;
            }
          }
        }),
      });

      WinJS.UI.processAll();
    };

    function onPause() {
    };

    function onResume() {
    };
} )();