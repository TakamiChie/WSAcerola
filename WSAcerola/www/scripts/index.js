// 空白のテンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkID=397704
// ページ上のコードをデバッグするには、Ripple で読み込むか、Android デバイス/エミュレーターで読み込みます。アプリを起動し、ブレークポイントを設定します。
// 次に、JavaScript コンソールで "window.location.reload()" を実行します。

var iProcessing;

// AppBarの表記（ツールバーアイコンなど）をリフレッシュする
function refreshAppBar() {
  // ここに置かないとProcessing.js側から関数が見えないので注意
  var state = iProcessing.getState();
  opPlayPause.winControl.icon = state == 1 ? "pause" : "play";
  opPlayPause.winControl.label = state == 1 ? "Pause" : "Play";
}

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
  
    function makeTime(time) {
      return Math.floor(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + Math.floor(time % 60);
    }

    function onDeviceReady() {
      document.addEventListener('pause', onPause.bind(this), false);
      document.addEventListener('resume', onResume.bind(this), false);

      WinJS.UI.Pages.define('index.html', {
        ready: function () {
          iProcessing = Processing.getInstanceById("timer");
          var inNormalTimerValues = [10, 30, 60, 180, 300];
          var inExceedTimerValues = [10, 30, 60];
          var inFinishedSound = ["Silent"];
          var setValues = function (box, values) {
            for (var i = 0; i < values.length; i++) {
              var n = values[i];
              var o = document.createElement("option");
              if (typeof (n) == "number") {
                o.value = n;
                o.text = makeTime(n);
              } else {
                o.value = n;
                o.text = n;
              }
              box.appendChild(o);
            }
          }
          setValues(document.getElementById("inNormalTimer"), inNormalTimerValues);
          setValues(document.getElementById("inExceedTimer"), inExceedTimerValues);
          setValues(document.getElementById("inFinishedSound"), inFinishedSound);
        }
      });

      WinJS.Namespace.define('Main', {
        operation: WinJS.UI.eventHandler(function (e) {
          var command = e.currentTarget;
          if (command.winControl) {
            switch (command.winControl.id) {
              case "opPlayPause":
                iProcessing.playpause();
                refreshAppBar();
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