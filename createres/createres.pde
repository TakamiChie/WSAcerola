int START_ANGLE = 270;

void setup(){
  size(100, 100);
  int[] adjustwinlogo = {0, 16};
  color noTlansparent = #FFFFFF;
  // Android
  saveThis(36, 36, "icons\\android\\icon-36-ldpi.png");
  saveThis(48, 48, "icons\\android\\icon-48-mdpi.png");
  saveThis(72, 72, "icons\\android\\icon-72-hdpi.png");
  saveThis(96, 96, "icons\\android\\icon-96-xhdpi.png");
  saveThis(640, 480, "screens\\android\\screen-hdpi-landscape.png");
  saveThis(480, 640, "screens\\android\\screen-hdpi-portrait.png");
  saveThis(426, 320, "screens\\android\\screen-ldpi-landscape.png");
  saveThis(320, 426, "screens\\android\\screen-ldpi-portrait.png");
  saveThis(470, 320, "screens\\android\\screen-mdpi-landscape.png");
  saveThis(320, 470, "screens\\android\\screen-mdpi-portrait.png");
  saveThis(960, 720, "screens\\android\\screen-xhdpi-landscape.png");
  saveThis(720, 960, "screens\\android\\screen-xhdpi-portrait.png");
  // iOS
  saveThis(80, 80, "icons\\ios\\icon-40-2x.png");
  saveThis(40, 40, "icons\\ios\\icon-40.png");
  saveThis(100, 100, "icons\\ios\\icon-50-2x.png");
  saveThis(50, 50, "icons\\ios\\icon-50.png");
  saveThis(114, 114, "icons\\ios\\icon-57-2x.png");
  saveThis(57, 57, "icons\\ios\\icon-57.png");
  saveThis(120, 120, "icons\\ios\\icon-60-2x.png");
  saveThis(180, 180, "icons\\ios\\icon-60-3x.png");
  saveThis(60, 60, "icons\\ios\\icon-60.png");
  saveThis(144, 144, "icons\\ios\\icon-72-2x.png");
  saveThis(72, 72, "icons\\ios\\icon-72.png");
  saveThis(152, 152, "icons\\ios\\icon-76-2x.png");
  saveThis(76, 76, "icons\\ios\\icon-76.png");
  saveThis(58, 58, "icons\\ios\\icon-small-2x.png");
  saveThis(29, 29, "icons\\ios\\icon-small.png");
  saveThis(2048, 1536, "screens\\ios\\screen-ipad-landscape-2x.png");
  saveThis(1024, 768, "screens\\ios\\screen-ipad-landscape.png");
  saveThis(1536, 2048, "screens\\ios\\screen-ipad-portrait-2x.png");
  saveThis(768, 1024, "screens\\ios\\screen-ipad-portrait.png");
  saveThis(640, 1136, "screens\\ios\\screen-iphone-568h-2x.png");
  saveThis(2208, 1242, "screens\\ios\\screen-iphone-landscape-736h.png");
  saveThis(640, 960, "screens\\ios\\screen-iphone-portrait-2x.png");
  saveThis(750, 1334, "screens\\ios\\screen-iphone-portrait-667h.png");
  saveThis(1242, 2208, "screens\\ios\\screen-iphone-portrait-736h.png");
  saveThis(320, 480, "screens\\ios\\screen-iphone-portrait.png");
  // Windows
  saveThis(150, 150, adjustwinlogo, 
    "icons\\windows\\Square150x150Logo.scale-100.png");
  saveThis(360, 360, adjustwinlogo, 
  	"icons\\windows\\Square150x150Logo.scale-240.png");
  saveThis(30, 30, "icons\\windows\\Square30x30Logo.scale-100.png");
  saveThis(310, 310, adjustwinlogo, 
  	"icons\\windows\\Square310x310Logo.scale-100.png");
  saveThis(106, 106, adjustwinlogo, 
  	"icons\\windows\\Square44x44Logo.scale-240.png");
  saveThis(70, 70, adjustwinlogo, 
  	"icons\\windows\\Square70x70Logo.scale-100.png");
  saveThis(170, 170, adjustwinlogo, 
  	"icons\\windows\\Square71x71Logo.scale-240.png");
  saveThis(50, 50, adjustwinlogo, 
  	"icons\\windows\\StoreLogo.scale-100.png");
  saveThis(120, 120, adjustwinlogo, 
  	"icons\\windows\\StoreLogo.scale-240.png");
  saveThis(310, 150, adjustwinlogo, 
  	"icons\\windows\\Wide310x150Logo.scale-100.png");
  saveThis(744, 360, adjustwinlogo, 
  	"icons\\windows\\Wide310x150Logo.scale-240.png");
  saveThis(620, 300, noTlansparent,
    "screens\\windows\\SplashScreen.scale-100.png");
  saveThis(1152, 1920, "screens\\windows\\SplashScreen.scale-240.png");
  saveThis(1152, 1920, "screens\\windows\\SplashScreenPhone.scale-240.png");
  // WP8
  saveThis(99, 99, adjustwinlogo,
  	"icons\\wp8\\ApplicationIcon.png");
  saveThis(159, 159, "icons\\wp8\\Background.png");
  saveThis(768, 1280, "screens\\wp8\\SplashScreenImage.jpg");
}

void saveThis(int w, int h, int[] adjust, color bkcolor,  String name) {
  PGraphics pg = createGraphics(w, h, JAVA2D);
  
  float wh = pg.width / 2;
  float hh = pg.height / 2;
  int ax = adjust[0];
  int ay = adjust[1];
  int wp = min(pg.width / 10, 20);
  int minsize = min(pg.width, pg.height) / 3 * 2 - max(ax, ay);
  int wc = minsize - wp;
  int hc = minsize - wp;
  color fg = #7799dd;
  pg.beginDraw();
  pg.background(bkcolor);
  pg.smooth();
  pg.noFill();
  // 背景
  pg.strokeWeight(wp);
  pg.stroke(#02133a);
  pg.ellipse(wh - ax, hh - ay, wc, hc);
  
  // 前景
  pg.stroke(fg);
  pg.arc(wh - ax, hh - ay, wc, hc, radians(START_ANGLE), radians(START_ANGLE + 360 * 0.65));
  pg.endDraw();
  pg.save("..\\WSAcerola\\res\\" + name);
  println(name + " Save Finished");
}

void saveThis(int w, int h, int[] adjust, String name) {
  saveThis(w, h, adjust, color(255, 0), name);
}

void saveThis(int w, int h, color bkcolor, String name) {
  int[] xy = {0, 0};
  saveThis(w, h, xy, bkcolor, name);
}

void saveThis(int w, int h, String name) {
  int[] xy = {0, 0};
  saveThis(w, h, xy, name);
}