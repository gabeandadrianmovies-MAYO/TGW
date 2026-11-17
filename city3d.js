
const container = document.getElementById("webCity3D");

if (container && typeof THREE !== "undefined") {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101828);
  scene.fog = new THREE.Fog(0x101828, 30, 85);

  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  camera.position.set(12, 16, 25);
  camera.lookAt(0, 2, 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  container.appendChild(renderer.domElement);

  // LIGHTING
  scene.add(new THREE.AmbientLight(0xffffff, 1.3));

  const sun = new THREE.DirectionalLight(0x89b4ff, 2);
  sun.position.set(10, 20, 10);
  scene.add(sun);

  // GROUND
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
      color: 0x17243d
    })
  );

  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // ROADS
  function road(x, z, width, length) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.05, length),
      new THREE.MeshStandardMaterial({
        color: 0x293954
      })
    );

    mesh.position.set(x, 0.03, z);
    scene.add(mesh);
  }

  road(0, 0, 4, 70);
  road(0, 0, 70, 4);

  // BUILDINGS
  const buildings = [];
  const colors = [
    0x6092ff,
    0x69e6d5,
    0x9274ff,
    0xffcb70,
    0xff7899,
    0x65b8ff,
    0xa2db88
  ];

  websites.forEach((site, i) => {
    const height = 3 + (i % 4) * 2;
    const x = (i % 4) * 6 - 9;
    const z = Math.floor(i / 4) * 9 - 5;

    const building = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, height, 3.5),
      new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        metalness: 0.3,
        roughness: 0.4
      })
    );

    building.position.set(x, height / 2, z);
    building.userData.website = site;

    scene.add(building);
    buildings.push(building);
  });

  // CLICK BUILDINGS
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  renderer.domElement.addEventListener("click", event => {
    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x =
      ((event.clientX - rect.left) / rect.width) * 2 - 1;

    mouse.y =
      -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const hits = raycaster.intersectObjects(buildings);

    if (hits.length > 0) {
      const site = hits[0].object.userData.website;

      document.getElementById("citySelected").textContent =
        "Selected: " + site.name;

      if (site.url) {
        if (confirm("Visit " + site.name + "?")) {
          window.open(site.url, "_blank", "noopener,noreferrer");
        }
      } else {
        alert("Website link coming soon!");
      }
    }
  });

  // CAMERA DRAG
  let dragging = false;
  let previousX = 0;

  renderer.domElement.addEventListener("pointerdown", e => {
    dragging = true;
    previousX = e.clientX;
  });

  window.addEventListener("pointerup", () => {
    dragging = false;
  });

  renderer.domElement.addEventListener("pointermove", e => {
    if (!dragging) return;

    const movement = e.clientX - previousX;
    previousX = e.clientX;

    camera.position.x += movement * 0.025;
    camera.lookAt(0, 2, 0);
  });

  // ANIMATION
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();

  // RESIZE
  window.addEventListener("resize", () => {
    camera.aspect =
      container.clientWidth / container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );
  });
}
