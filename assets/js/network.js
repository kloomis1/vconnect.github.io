var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    mouseX = 0, mouseY = 0,
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,
    SEPARATION = 200,
    AMOUNTX = 10,
    AMOUNTY = 10,
    // array to store particle objects
    particles = [],
    PI2 = Math.PI * 2,
    camera, scene, renderer;

init();
animate();

function init() {
    var container, separation = 300, amountX = 50, amountY = 50,
    particle;
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera( 6, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000);
    camera.position.z = 1000;
    scene = new THREE.Scene();
    renderer = new THREE.CanvasRenderer();
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    controls = new THREE.TrackballControls( camera ); // mouse control
    controls.addEventListener( 'change', render );    // mouse control
    container.appendChild( renderer.domElement );
    
    var vDistance = function(j) {
        var v1 = particles[0];
        var sDist = 10000;
        for (var k = 0; k < particles.length; k++) {
            if (j == k) {
                continue;
            }
            else {
                var dx = particles[k][0] - particles[j][0];
                var dy = particles[k][1] - particles[j][1];
                var dz = particles[k][2] - particles[j][2];

                var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );
                if (dist < sDist) {
                    v1 = particles[k];
                    sDist = dist;
                }
            }
        }
        return v1;                  
    };

    // particles
    var material = new THREE.ParticleCanvasMaterial( {
    	opacity: 0.7,
        color: 0xffffff,
        program: function ( context ) {
            context.beginPath();
            context.arc( 0, 0, 0.5, 0, PI2, true );
            context.closePath();
            context.fill();
        }
    } );

    
    for ( var i = 0; i < 400; i++ ) {
        particle = new THREE.Particle( material );
        particle.position.x = Math.random() * 2 - 1;
        particle.position.y = Math.random() * 2 - 1;
        particle.position.z = Math.random() * 2 - 1;
        particle.position.normalize();
        particle.position.multiplyScalar(40); // normally (Math.random()*10 + 450)
        particles.push([particle.position.x, particle.position.y, particle.position.z]);
        scene.add( particle );
    }
    
	// var materialOuter = new THREE.ParticleCanvasMaterial( {
 //    	opacity: 0.2,
 //        color: 0xffffff,
 //        program: function ( context ) {
 //            context.beginPath();
 //            context.arc( 0, 0, 1, 0, PI2, true );
 //            context.closePath();
 //            context.fill();
 //        }
 //    } );

 //    for ( var h = 0; h < 1; h++ ) {
 //        particleOuter = new THREE.Particle( materialOuter );
 //        particleOuter.position.x = particles[h][0];
 //        particleOuter.position.y = particles[h][1];
 //        particleOuter.position.z = particles[h][2];
 //        particleOuter.position.normalize();
 //        particleOuter.position.multiplyScalar(40);
 //        scene.add( particleOuter);
 //    }
    
 //    // links
 //    for ( var j = 0; j < 0; j++) {
 //        var geometry = new THREE.Geometry();
 //        var vertex = new THREE.Vector3( particles[j][0], particles[j][1], particles[j][2] );
 //        geometry.vertices.push( vertex );
 //        var vConnect = vDistance(j);
 //        var vertex2 = new THREE.Vector3( vConnect[0], vConnect[1], vConnect[2]);
 //        geometry.vertices.push( vertex2 );
 //        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 3, opacity: 0.5} ) );
 //        scene.add( line );
 //    }
    
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
}

function render() {
    camera.position.x += ( mouseX  ) *0.1;
    camera.position.y += ( - mouseY  ) *0.1;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}

// function zoomNode() {
// 	camera.position.x = particles[0][0];
//     camera.position.y = particles[0][1];
//     camera.position.z = particles[0][2];
//     requestAnimationFrame( animate );
//     controls.update();
//     camera.lookAt( scene.position );
//     renderer.render( scene, camera );
// }

// function highlightNode() {
//         particle = new THREE.Particle( material );
//         particle.position.x = particles[0][0];
//         particle.position.y = particles[0][1];
//         particle.position.z = particles[0][2];
//         particle.position.normalize();
//         particle.position.multiplyScalar(40); // normally (Math.random()*10 + 450)
//         particles.push([particle.position.x, particle.position.y, particle.position.z]);
//         scene.add( particle );
//     }

// function move() {
// 	init();
// 	controls.target.set( 100, 100, 100 );
// 	controls.update();
// 	animate();
// }

var vDistance = function(j) {
        var v1 = particles[0];
        var sDist = 10000;
        for (var k = 0; k < particles.length; k++) {
            if (j == k) {
                continue;
            }
            else {
                var dx = particles[k][0] - particles[j][0];
                var dy = particles[k][1] - particles[j][1];
                var dz = particles[k][2] - particles[j][2];

                var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );
                if (dist < sDist) {
                    v1 = particles[k];
                    sDist = dist;
                }
            }
        }
        return v1;                  
};

function move() {
    camera.position.x = ( particles[nodeTracker][0]);
    camera.position.y = ( particles[nodeTracker][1]);
    camera.position.z = ( particles[nodeTracker][2]);
    camera.position.multiplyScalar(5);
    //camera.position.normalize();
    //camera.lookAt( scene.position );

    // var beginning = new THREE.Vector3( camera.position.x, camera.position.y, camera.position.z );
    // var end = particles[0];
    // beginning.applyQuaternion( quaternion );
    // end.applyQuaternion ( quaterion );

    // var dest = new THREE.Quaternion(particles[0][0], particles[0][1], particles[0][2], 1);
    // var qm = new THREE.Quaternion();
    // THREE.Quaternion.slerp(camera.quaternion, dest, qm, 0.07);
    // camera.quaternion = qm;
    // camera.quaternion.normalize();

    //camera.quaternion.slerp(scene.position,0); //t = normalized value 0 to 1
    //renderer.render( scene, camera );
    setTimeout(lightNodes, 50);
    //lightNodes();
    setTimeout(addLink, 500);
    //nodeTracker++;
}


function addLink() {
    for ( var j = 0; j < 1 && nodeTracker < particles.length; j++) {
        var geometry = new THREE.Geometry();
        var vertex = new THREE.Vector3( particles[nodeTracker][0], particles[nodeTracker][1], particles[nodeTracker][2] );
        geometry.vertices.push( vertex );
        var vConnect = vDistance(nodeTracker);
        var vertex2 = new THREE.Vector3( vConnect[0], vConnect[1], vConnect[2]);
        geometry.vertices.push( vertex2 );
        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 3, opacity: 0.5} ) );
        scene.add( line );
        nodeTracker++;
    }
}

var materialOuter = new THREE.ParticleCanvasMaterial( {
        opacity: 0.5,
        color: 0xffffff,
        program: function ( context ) {
            context.beginPath();
            context.arc( 0, 0, 1, 0, PI2, true );
            context.closePath();
            context.fill();
        }
} );

var nodeTracker = 0;

function lightNodes() {
    for ( var h = 0; h < 1 && nodeTracker < particles.length; h++ ) {
        var particleOuter = new THREE.Particle( materialOuter );
        particleOuter.position.x = particles[nodeTracker][0];
        particleOuter.position.y = particles[nodeTracker][1];
        particleOuter.position.z = particles[nodeTracker][2];
        particleOuter.position.normalize();
        particleOuter.position.multiplyScalar(40);
        scene.add( particleOuter);
    }
}



function lightClosestX() {
    var v1 = particles[0];
        var sDist = 10000;
        for (var k = 0; k < particles.length; k++) {
            if (j == k) {
                continue;
            }
            else {
                var dx = particles[k][0] - particles[j][0];
                var dy = particles[k][1] - particles[j][1];
                var dz = particles[k][2] - particles[j][2];

                var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );
                if (dist < sDist) {
                    v1 = particles[k];
                    sDist = dist;
                }
            }
        }
        return v1;
}