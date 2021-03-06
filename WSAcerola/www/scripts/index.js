﻿// 空白のテンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkID=397704
// ページ上のコードをデバッグするには、Ripple で読み込むか、Android デバイス/エミュレーターで読み込みます。アプリを起動し、ブレークポイントを設定します。
// 次に、JavaScript コンソールで "window.location.reload()" を実行します。

var iProcessing;

var alermed;

var vibration;

var chime;

var signal;

// タイマー実行中1フレームごとに呼び出されるメソッド
function jsframe(time, limittime, exceedtime, percent, reset) {
  if (reset)
  {
    console.log("reset");
    // リセット/リスタート時の処理
    if(signal != undefined) signal.stop();
    if(chime != undefined) chime.stop();
  }
  var finishedSound = localStorage.getItem("FinishedSound");
  if (time == 0) {
    alermed = false;
    vibration = false;
  }
  if (!alermed) {
    if (finishedSound == "Signal" && time > limittime - 3) {
      signal.play();
      alermed = true;
    } else if (finishedSound == "Chime" && time > limittime) {
      chime.play();
      alermed = true;
    }
  }
  if (!vibration) {
    if (time > limittime) {
      console.log("vibration on");
      vibration = true;
    }
  }
}

// AppBarの表記（ツールバーアイコンなど）をリフレッシュする
function refreshAppBar() {
  // ここに置かないとProcessing.js側から関数が見えないので注意
  var state = iProcessing.getState();
  opPlayPause.winControl.icon = state == 1 ? "pause" : "play";
  opPlayPause.winControl.label = state == 1 ? opPlayPause.dataset.forfalse : opPlayPause.dataset.fortrue;
}

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function makeTime(time) {
      return Math.floor(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + Math.floor(time % 60);
    }
  
    // 設定の読み込み
    function refreshSetting(load) {
      var settingNames = [
          ["NormalTimer", 60],
          ["ExceedTimer", 60],
          ["FinishedSound", "Silent"],
          ["Countdown", "off"]
        ];
      for (var i = 0; i < settingNames.length; i++) {
        var s = settingNames[i][0];
        var value = localStorage.getItem(s);
        if (value == undefined) {
          value = settingNames[i][1];
        }
        if (load) {
          switch (s) {
            case "NormalTimer":
            case "ExceedTimer":
            case "FinishedSound":
              document.getElementById("in" + s).value = value;
              break;
            case "Countdown":
              document.getElementById("in" + s).checked = value == "on";
              break;
          }
        }
        switch (s) {
          case "NormalTimer":
            iProcessing.setTimerTime(value);
            break;
          case "ExceedTimer":
            iProcessing.setExceedTime(value);
            break;
          case "FinishedSound":
            break;
          case "Countdown":
            iProcessing.setCountdown(value == "on");
            break;
        }
      }
    }

    function settingChanged(e) {
      if (e.target.type == "checkbox") {
        localStorage.setItem(e.target.id.substring(2), e.target.checked ? "on" : "off");
      } else {
        localStorage.setItem(e.target.id.substring(2), e.target.value);
      }
      refreshSetting(false);
    }

    function onDeviceReady() {
      document.addEventListener('pause', onPause.bind(this), false);
      document.addEventListener('resume', onResume.bind(this), false);

      WinJS.UI.Pages.define('index.html', {
        ready: function () {
          // タイマー画像インスタンスの読み込み
          var timer = document.getElementById("timer");
          timer.addEventListener("click", function (e) {
            iProcessing.playpause();
            refreshAppBar();
          });
          iProcessing = Processing.getInstanceById("timer");

          // 設定の読み込み
          var inNormalTimerValues = [10, 30, 60, 180, 300, 600, 1800, 3600];
          var inExceedTimerValues = [-1, 10, 30, 60];
          var inFinishedSound = ["Silent", "Chime", "Signal"];
          var setValues = function (box, values) {
            box.onchange = settingChanged;
            for (var i = 0; i < values.length; i++) {
              var n = values[i];
              var o = document.createElement("option");
              if (typeof (n) == "number") {
                if (n <= -1) {
                  o.value = -1;
                  o.text = "--:--";
                } else {
                  o.value = n;
                  o.text = makeTime(n);
                }
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
          document.getElementById("inCountdown").onchange = settingChanged;
          refreshSetting(true);

          // 音声読み込み
          var s = location.pathname;
          var i = s.lastIndexOf('/');
          var path = s.substring(0, i + 1) + "audio/";

          chime = new Media(path + "chime.mp3", mediaonSuccess, mediaonFailed);
          signal = new Media(path + "signal.mp3", mediaonSuccess, mediaonFailed);

          // ローカライズ対応
          var localize = new Array();
          localize["ja-JP"] = {
            "inNormalTimerLabel": "タイマー時間",
            "inExceedTimerLabel": "タイマー時間(超過時間)",
            "inFinishedSoundLabel": "タイマー終了時のサウンド",
            "inCountdownLabel": "カウントダウン",
            "opPlayPause": ["開始", "ポーズ"],
            "opReset": "リセット",
            "opSetting": "設定"
          };
          if (localize[navigator.language]) {
            var lo = localize[navigator.language];
            for (var n in lo) {
              var elm = document.getElementById(n);
              if (!elm) continue;
              var text;
              if (typeof lo[n] == "object") {
                elm.dataset.fortrue = lo[n][0];
                elm.dataset.forfalse = lo[n][1];
                text = lo[n][0];
              } else {
                text = lo[n];
              }
              if (elm.winControl) {
                elm.winControl.label = text;
              } else {
                elm.innerText = text;
              }
            }
          }
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

    function mediaonSuccess() {
      console.log("media loaded");
    };

    function mediaonFailed() {
      console.log("media load failed");
      console.log("code:" + e.code);
      console.log("message:" + e.message);
    };
} )();