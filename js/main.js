import * as THREE from 'libs/three.min.js'
require('libs/OrbitControls.js')

let ctx = canvas.getContext('webgl', { antialias: true, preserveDrawingBuffer: true })

let scene
let renderer
let camera
let controls
let earthMesh = undefined
let preLoadDone  = false;

// ... 其它变量／常量 ...

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.threeStart();
  }

  threeStart() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    var canvas_dom = document.createElement('div');
    canvas_dom.id = 'three-box';

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: renderer,
      context: ctx
    });
    renderer.setSize(width * 0.6, height * 0.6);
    canvas_dom.appendChild(renderer.domElement);
    renderer.setClearColor(0x666666, 1.0);

    // 透视相机 视角越大，看到的场景越大，那么中间的物体相对于整个场景来说，就越小了
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5

    // 添加环境光
    let ambientLight = new THREE.AmbientLight(0x00ff00)
    scene.add(ambientLight)
    //let earthMesh = this.initEarth();
    var earthGeo = new THREE.SphereGeometry(1.5, 100, 100);
    var earthMater = new THREE.MeshBasicMaterial({
      //map: new THREE.TextureLoader().load('./images/earth.jpg')
      map: new THREE.TextureLoader().load('http://www.17sucai.com/preview/13694/2017-12-23/public1/images/df35901e.map_inverted.png'),
      //color: 0xeeeee0
    });
    earthMesh = new THREE.Mesh(earthGeo, earthMater);
    scene.add(earthMesh);
    preLoadDone = true;

    
 
    // 添加投射光
    var directionalLight = new THREE.DirectionalLight(0xcccccc);
    directionalLight.position.set(0, 1200, 1000).normalize();
    scene.add(directionalLight);

    // 添加手势控制
    controls = new THREE.OrbitControls(camera);

    this.loop()

    //this.jump();
  }

  /**
   * 逻辑更新主函数
   */
  update() {
    // 更新代码
    if (preLoadDone) {
    }
  }

  /**
   * canvas 重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    if (preLoadDone) {
      if (earthMesh != undefined) {
        earthMesh.rotation.y += 0.001
      }
      renderer.render(scene, camera)
    }
  }

  // 实现帧循环
  loop() {
    this.update()
    this.render()

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }

  jump() {
    wx.navigateToMiniProgram({
      appId: '',
      path: 'page/index/index?id=123',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  }
}