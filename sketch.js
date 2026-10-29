function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
// 定義變數儲存圖片資源
let walkImg;
let throwImg;

// 定義角色狀態變數
let posX;          // 角色的 X 座標
let posY;          // 角色的 Y 座標
let speed = 4;     // 角色的移動速度
let currentAction = 'walk'; // 目前的動作狀態：'walk' (走路) 或 'throw' (丟)
let direction = 1; // 面向方向：1 代表右邊，-1 代表左邊

// 定義走路動畫 (walk.png) 的精靈圖參數
let walkFrames = 8;       // 走路圖片張數
let walkTotalW = 459;     // 走路整張圖的總寬度
let walkTotalH = 109;     // 走路整張圖的總高度
let walkW = walkTotalW / walkFrames; // 計算單張走路精靈的寬度 (約 57.375)
let walkH = walkTotalH;   // 單張走路精靈的高度
let walkFrameIndex = 0;   // 目前播放到走路的第幾張

// 定義丟東西動畫 (丟.png) 的精靈圖參數
let throwFrames = 5;      // 丟東西圖片張數
let throwTotalW = 559;    // 丟東西整張圖的總寬度
let throwTotalH = 123;    // 丟東西整張圖的總高度
let throwW = throwTotalW / throwFrames; // 計算單張丟東西精靈的寬度 (111.8)
let throwH = throwTotalH; // 單張丟東西精靈的高度
let throwFrameIndex = 0;  // 目前播放到丟東西的第幾張

// p5.js 預載入函式：在遊戲開始前先載入圖片
function preload() {
  // 載入走路的精靈圖（請確保路徑正確或瀏覽器有權限讀取本地檔案）
  walkImg = loadImage('c:/Users/User/Downloads/1/1-2/walk.png');
  // 載入丟東西的精靈圖
  throwImg = loadImage('c:/Users/User/Downloads/1/1-1/丟.png');
}

// p5.js 設定函式：只執行一次
function setup() {
  // 建立全螢幕的畫布
  createCanvas(windowWidth, windowHeight);
  
  // 初始化角色的位置在畫面正中央
  posX = width / 2;
  posY = height / 2;
  
  // 設定圖片繪製模式為中心點對齊，方便做翻轉動作
  imageMode(CENTER);
  
  // 設定動畫播放的幀率 (FPS)，讓精靈圖切換不要太快
  frameRate(12);
}

// p5.js 主要繪圖循環函式：每秒不停重複執行
function draw() {
  // 設定背景顏色為 e7bc91 (使用 HEX 色碼)
  background('#e7bc91');
  
  // 偵測鍵盤按鍵並更新角色狀態
  if (keyIsDown(RIGHT_ARROW)) {
    // 當按下右鍵：切換為丟東西動作
    currentAction = 'throw';
    // 面向右邊
    direction = 1;
    // 座標往右移動
    posX += speed;
  } else if (keyIsDown(LEFT_ARROW)) {
    // 當按下左鍵：切換為走路動作
    currentAction = 'walk';
    // 面向左邊（做轉向動作）
    direction = -1;
    // 座標往左移動
    posX -= speed;
  } else {
    // 如果沒有按左右鍵，預設回歸走路狀態（原地循環播放）
    currentAction = 'walk';
  }
  
  // 為了防止角色走出螢幕，限制 X 座標在畫布範圍內
  posX = constrain(posX, 0, width);

  // 進入矩陣轉換，用來處理角色的位置與翻轉（左右轉向）
  push();
  
  // 將畫布原點移動到角色的座標位置
  translate(posX, posY);
  
  // 利用 scale(direction, 1) 來做到轉向：當 direction 為 -1 時，水平方向會鏡像翻轉
  scale(direction, 1);
  
  // 根據目前動作狀態繪製對應的精靈圖
  if (currentAction === 'walk') {
    
    // 計算當前幀在 walk.png 上的 X 軸裁切起始點
    let sx = walkFrameIndex * walkW;
    
    // 繪製圖片：image(圖片, 畫布X, 畫布Y, 顯示寬, 顯示高, 裁切X, 裁切Y, 裁切寬, 裁切高)
    // 因為前面使用了 translate(posX, posY)，所以這裡的畫布座標填 (0, 0) 即可
    image(walkImg, 0, 0, walkW, walkH, sx, 0, walkW, walkH);
    
    // 更新幀計數器，讓它往下一張前進
    walkFrameIndex++;
    
    // 如果超過總張數，就重設為 0 以達到循環播放的效果
    if (walkFrameIndex >= walkFrames) {
      walkFrameIndex = 0;
    }
    
  } else if (currentAction === 'throw') {
    
    // 計算當前幀在 丟.png 上的 X 軸裁切起始點
    let sx = throwFrameIndex * throwW;
    
    // 繪製丟東西的角色精靈
    image(throwImg, 0, 0, throwW, throwH, sx, 0, throwW, throwH);
    
    // 更新幀計數器
    throwFrameIndex++;
    
    // 如果超過總張數，就重設為 0 以達到循環播放的效果
    if (throwFrameIndex >= throwFrames) {
      throwFrameIndex = 0;
    }
  }
  
  // 恢復原來的畫布矩陣設定，避免影響到其他可能要繪製的物件
  pop();
}

// p5.js 視窗尺寸改變動態調整函式
function windowResized() {
  // 當瀏覽器視窗大小改變時，重新調整畫布為全螢幕
  resizeCanvas(windowWidth, windowHeight);
}
