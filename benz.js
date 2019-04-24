var width = 640;
var height = 480;
var detector;
var item = false;
var result = []
var maleSixty = [];
var maleForty = [];
var maleTwenty = [];
var womenTwenty = [];
var womenForty = [];
var womenSixty = [];
// import entire SDK
// var AWS = require('aws-sdk');
// // import AWS object without services
// var AWS = require('aws-sdk/global');
// // import individual service
// var S3 = require('aws-sdk/clients/s3');




onload = function () {
        document.getElementById("myImg").src = "http://www.hdcarwallpapers.com/walls/mercedes_amg_gt_r_2018_4k_2-HD.jpg";
        

    // SDK Needs to create video and canvas nodes in the DOM in order to function
    // Here we are adding those nodes a predefined div.
    var divRoot = $("#affdex_elements")[0];
    // var divRoot = document.getElementById("affdex_elements");

    //Construct a CameraDetector and specify the image width / height and face detector mode.
    detector = new affdex.CameraDetector(divRoot, width, height, affdex.FaceDetectorMode.LARGE_FACES);

    //Enable detection of all Expressions, Emotions and Emojis classifiers.
    detector.detectAllEmotions();
    detector.detectAllExpressions();
    detector.detectAllEmojis();
    detector.detectAllAppearance();

    //Add a callback to notify when the detector is initialized and ready for runing.
    detector.addEventListener("onInitializeSuccess", function () {
        log('logs', "The detector reports initialized");
        //Display canvas instead of video feed because we want to draw the feature points on it
        document.getElementById("face_video_canvas").style.display = "block";
        document.getElementById("face_video").style.display = "none";
    });

    //Add a callback to notify when camera access is allowed
    detector.addEventListener("onWebcamConnectSuccess", function () {
        log('logs', "Webcam access allowed");
    });

    //Add a callback to notify when camera access is denied
    detector.addEventListener("onWebcamConnectFailure", function () {
        log('logs', "webcam denied");
        console.log("Webcam access denied");
    });

    //Add a callback to notify when detector is stopped
    detector.addEventListener("onStopSuccess", function () {      
        log('logs', "The detector reports stopped");
        document.getElementById("results").innerHTML = ""
    });

    //Add a callback to receive the results from processing an image.
    //The faces object contains the list of the faces detected in an image.
    //Faces object contains probabilities for all the different expressions, emotions and appearance metrics
    detector.addEventListener("onImageResultsSuccess", function (faces, image, timestamp) {
        document.getElementById("results").innerHTML = ""
        log('results', "Timestamp: " + timestamp.toFixed(2));
        log('results', "Number of faces found: " + faces.length);
        if (faces.length > 0) {
            log('results', "Appearance: " + JSON.stringify(faces[0].appearance));
            //   console.log(faces[0].appearance)
            log('results', "Emotions: " + JSON.stringify(faces[0].emotions, function (key, val) {
                return val.toFixed ? Number(val.toFixed(0)) : val;
            }));
            log('results', "Expressions: " + JSON.stringify(faces[0].expressions, function (key, val) {
                return val.toFixed ? Number(val.toFixed(0)) : val;
            }));
            log('results', "Emoji: " + faces[0].emojis.dominantEmoji);
            drawFeaturePoints(image, faces[0].featurePoints);
            if (faces[0].appearance["gender"] == 'Male') {
                if (faces[0].appearance["age"] == 'Under 18') {
                    document.getElementById("description").innerHTML="Mercedes Benz SL- Even More Dynamic";
                    document.getElementById("myImg").src = "https://wallpaperaccess.com/full/825408.jpg";
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("description").innerHTML="Mercedes Benz SL- Even More Dynamic"
                        document.getElementById("myImg").src = "http://www.hdcarwallpapers.com/walls/mercedes_amg_gt_c_roadster_2018_4k_5-HD.jpg";
                        document.getElementById("cartImage").src = "http://www.hdcarwallpapers.com/walls/mercedes_amg_gt_c_roadster_2018_4k_5-HD.jpg";
                        // $("#myModal").modal();
                        // detector.stop();
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].emotions["anger"] > 30) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("description").innerHTML="Mercedes Benz SL- Even More Dynamic"
                        document.getElementById("myImg").src = "http://wp2.carwallpapers.ru/mercedes-benz/slc/2016-300-amg-line/Mercedes-Benz-SLC-300-AMG-Line-2016-3840x2160-002.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("description").innerHTML="Mercedes Benz SLC- New Name New Dynamic"
                        document.getElementById("myImg").src = "https://www.wallpapersrc.com/img/871b5b433e214633a8e854c382f1df1f/mercedes-benz-slc-class-amg-line-4096x2160.jpg"
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("description").innerHTML="Mercedes Benz SL- Even More Dynamic"
                        document.getElementById("myImg").src = "http://wp.widewallpapers.net/4k/cars/mercedes-benz/sl/3840x2160/Mercedes-AMG-SL-63-2015-3840x2160-001.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
                else if (faces[0].appearance["age"] == '18 - 24') {
                    document.getElementById("description").innerHtml="AMG GT For Sports Enthusisats";
                    document.getElementById('myImg').src ="https://i0.wp.com/www.carpixel.net/w/75dd8b581b538d1c9d48b00081bbb2f2/mercedes-amg-gt-r-wallpaper-hd-75400.jpg";
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("description").innerHTML="AMG GT For Sports Enthusisats"
                        document.getElementById("myImg").src = "https://www.mercedes-benz.com/content/dam/brandhub/mercedes-benz/mbsocialcar/mbsocialcar-mercedes-amg-gt-r/00-mercedes-benz-vehicles-mbsocialcar-mercedes-amg-gt-r-c-190-designo-diamond-white-bright-dennis-noten-2560x1440-2560x1440.jpg";
                        document.getElementById("cartImage").src = "https://www.mercedes-benz.com/content/dam/brandhub/mercedes-benz/mbsocialcar/mbsocialcar-mercedes-amg-gt-r/00-mercedes-benz-vehicles-mbsocialcar-mercedes-amg-gt-r-c-190-designo-diamond-white-bright-dennis-noten-2560x1440-2560x1440.jpg";
                        // $("#myModal").modal();
                        // detector.stop();
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].emotions["anger"] > 30) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("description").innerHTML="AMG GT For Sports Enthusisats";
                        document.getElementById("myImg").src = "https://cdn.motor1.com/images/mgl/0A72m/s1/mercedes-amg-gt-s-by-creative-bespoke.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("description").innerHTML="AMG GT For Sports Enthusisats"
                        document.getElementById("myImg").src = "https://www.mercedes-benz.com/content/dam/brandhub/mercedes-benz/mbsocialcar/mbsocialcar-mercedes-amg-gt-r/mercedes-amg-gt-r-r-190-wallpaper-01.zip_extracted/01-mercedes-amg-gt-r-r-190-wallpaper-4k.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("description").innerHtml="AMG GT For Sports Enthusisats";
                        document.getElementById("myImg").src = "http://img.luxusbenz.com/full/2993d871874d42a4.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
                else if (faces[0].appearance["age"] == '25 - 34') {
                    document.getElementById("description").innerHTML="The CLS: Third Generation of the Original";
                    document.getElementById('myImg').src = "https://www.mercedes-benz.com/content/dam/brandhub/mercedes-benz/mbsocialcar/mbsocialcar-cls/CLS-450-4MATIC-01.zip_extracted/01-CLS-450-4MATIC-HD.jpg";
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src ="https://images6.alphacoders.com/953/953046.jpg";
                        document.getElementById("cartImage").src = "https://images6.alphacoders.com/953/953046.jpg";
                        // $("#myModal").modal();
                        // detector.stop();
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].emotions["anger"] > 30) {
                        document.getElementById("description").innerHTML="The CLS: Third Generation of the Original"
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src ="https://www.mercedes-benz.com/content/dam/brandhub/mercedes-benz/mbsocialcar/mbsocialcar-cls/CLS-450-4MATIC-04.zip_extracted/04-CLS-450-4MATIC-4k.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("description").innerHTML="The CLS: Third Generation of the Original"
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src =  "https://cdn.motor1.com/images/mgl/EnVJq/s1/mercedes-cls-amg-line.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("description").innerHTML="The CLS: Third Generation of the Original";
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = "https://hdqwalls.com/download/2019-mercedes-benz-cls-450-amg-eq-2048x1152.jpg"
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
                else if (faces[0].appearance["age"] == '35 - 44') {
                    document.getElementById("description").innerHTML="The New G-Class:Stronger than Time";
                    document.getElementById('myImg').src = "http://wp.widewallpapers.net/4k/cars/mercedes-benz/g/2560x1440/Mercedes-AMG-G63-2015-2560x1440-003.jpg";
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("description").innerHTML="The New G-Class:Stronger than Time";
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = "https://www.wallpaperflare.com/static/62/476/986/mercedes-benz-amg-g-63-2018-cars-4k-white-wallpaper.jpg";
                        document.getElementById("cartImage").src = "https://www.wallpaperflare.com/static/62/476/986/mercedes-benz-amg-g-63-2018-cars-4k-white-wallpaper.jpg";
                        // $("#myModal").modal();
                        // detector.stop();
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].emotions["anger"] > 30) {
                        document.getElementById("description").innerHTML="The New G-Class:Stronger than Time";
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = "https://avatars.mds.yandex.net/get-pdb/25978/4f6502fc-9095-4373-ae81-993ff636f7b4/orig";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("description").innerHTML="The New G-Class:Stronger than Time";
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = "https://hips.hearstapps.com/hmg-prod/images/2019-mercedes-benz-g-class-placement-1525362144.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("description").innerHTML="The New G-Class:Stronger than Time";
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = "http://www.hdcarwallpapers.com/walls/2018_mercedes_amg_g_65_final_edition_4k_3-HD.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
                else if (faces[0].appearance["age"] == '55 - 64') {
                    document.getElementById("myImg").src="http://www.hdcarwallpapers.com/walls/2017_mercedes_benz_gla_220d_4matic_amg_line_4k-HD.jpg";
                    document.getElementById("description").innerHtml="The GLA : Fitness Programme for Comapct SUV";
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("description").innerHtml="The GLA : Fitness Programme for Comapct SUV";
                        document.getElementById("myImg").src = "https://images.wallpaperscraft.com/image/mercedes_benz_cls_class_x166_car_side_view_106793_3840x2160.jpg";
                        document.getElementById("cartImage").src = "https://images.wallpaperscraft.com/image/mercedes_benz_cls_class_x166_car_side_view_106793_3840x2160.jpg";
                        $("#myModal").modal();
                        detector.stop();
                    }
                    else if (faces[0].emotions["anger"] > 30) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("description").innerHtml="The GLA : Fitness Programme for Comapct SUV";
                        document.getElementById("myImg").src = "https://avatars.mds.yandex.net/get-pdb/1101614/dc0a26c5-dca2-46d4-9f97-51e4d11c13c4/orig";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("description").innerHtml="The GLA : Fitness Programme for Comapct SUV";
                        document.getElementById("myImg").src = "http://www.hdcarwallpapers.com/walls/2017_mercedes_benz_gla_200-HD.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("description").innerHtml="The GLA : Fitness Programme for Comapct SUV";
                        document.getElementById("myImg").src = "http://uhd-wallpapers.net/images/mercedes-gla_911.jpeg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
            }

            /******************************* Women Section********************************/

            else if (faces[0].appearance["gender"] == 'Female') {
               
                /** *************Age Section Under 18*************** */

                if (faces[0].appearance["age"] == 'Under 18') {
                    document.getElementById("description").innerHTML="The A-Class Designed for You !"
                    document.getElementById("myImg").src = "https://s2.best-wallpaper.net/wallpaper/2560x1440/1610/2017-Mercedes-Maybach-S600-Sedan_2560x1440.jpg";
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = "https://images2.alphacoders.com/843/843849.jpg";
                        document.getElementById("cartImage").src = "https://images2.alphacoders.com/843/843849.jpg";
                        $("#myModal").modal();
                        detector.stop();
                    }
                    else if (faces[0].emotions["anger"] > 10) {
                        document.getElementById("description").innerHTML="The A-Class Designed for You !"
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = "http://img.luxusbenz.com/full/ab684e4e7d19d0b1.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("description").innerHTML="The A-Class Designed for You !"
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = "http://wp2.carwallpapers.cc/mercedes-benz/a/2018-amg-line-edition/Mercedes-Benz-A-class-AMG-Line-Edition-2018-3840x2160-002.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("description").innerHTML="The A-Class Designed for You !"
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = "https://www.mercedes-benz.com/content/dam/brandhub/mercedes-benz/mbsocialcar/mbsocialcar-a-class/02-mercedes-benz-a-200-w-177-wallpaper-4K.zip_extracted/02-mercedes-benz-a-200-w-177-4K.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
                else if(faces[0].appearance["age"]== '25-34') {
                    document.getElementById("myImg").src="https://www.mercedes-benz.com/content/dam/brandhub/mercedes-benz/mbsocialcar/mbsocialcar-s-class/01-s-klasse-wallpaper.zip_extracted/01-s-klasse-wallpaper-4K.jpg";
                    document.getElementById("description").innerHTML="Mercedes Benz S-Class The Automotive Benchmark "
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("description").innerHTML="Mercedes Benz S-Class The Automotive Benchmark "
                        document.getElementById("myImg").src = "http://hdqwalls.com/wallpapers/2018-mercedes-benz-s-650-zq.jpg";
                        document.getElementById("cartImage").src = "http://hdqwalls.com/wallpapers/2018-mercedes-benz-s-650-zq.jpg";
                        $("#myModal").modal();
                        detector.stop();
                    }
                    else if (faces[0].emotions["anger"] > 10) {
                        document.getElementById("description").innerHTML="Mercedes Benz S-Class The Automotive Benchmark "
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = "http://wall.bestcarmag.com/sites/default/files/mercedes-benz-350-class-wallpaper-hd-40391-8185030.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("description").innerHTML="Mercedes Benz S-Class The Automotive Benchmark "
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = "https://hdqwalls.com/download/mercedes-benz-s-class-c217-3840x2400.jpg"
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("description").innerHTML="Mercedes Benz S-Class The Automotive Benchmark "
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = "https://car-images.bauersecure.com/pagefiles/78657/1752x1168/merc_s-class_coupe_03.jpg?mode=max&quality=90&scale=down";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }

                /** *******************Age Section Between 18 and 24********** */

                else if (faces[0].appearance["age"] == '18 - 24') {
                    document.getElementById("myImg").src="https://www.mercedes-benz.com/content/dam/brandhub/mercedes-benz/mbsocialcar/mbsocialcar-e-class-coupe/000-mercedes-benz-vehicles-e-class-e-400-4matic-coupe-c-238-2560x1440-2560x1440.jpg";
                    document.getElementById("description").innerHTML="The new Mercedes Benz B-Class : More Sport To the Tourer"
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("description").innerHTML="The new Mercedes Benz B-Class : More Sport To the Tourer";
                        document.getElementById("myImg").src = "https://cdn.motor1.com/images/mgl/v20zQ/s1/2017-mercedes-benz-b-class.jpg"
                        document.getElementById("cartImage").src = "https://cdn.motor1.com/images/mgl/v20zQ/s1/2017-mercedes-benz-b-class.jpg"
                        $("#myModal").modal();
                        detector.stop();
                    }
                    else if (faces[0].emotions["anger"] > 10) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("description").innerHTML="The new Mercedes Benz B-Class : More Sport To the Tourer";
                        document.getElementById("myImg").src = "https://www.carpixel.net/w/56961c558d4c9c0e1fba4235580380c2/mercedes-benz-b-class-night-package-wallpaper-hd-89031.jpg"
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("description").innerHTML="The new Mercedes Benz B-Class : More Sport To the Tourer";
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = "https://www.carpixel.net/w/ab29e9ca45615f2bd69e1faf4d5f08b9/mercedes-benz-b-class-amg-line-wallpaper-hd-84757.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("description").innerHTML="The new Mercedes Benz B-Class : More Sport To the Tourer";
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = "http://www.hartonomotor.com/content/media_library/retailer/product/pc/b-class-w246/mercedes-benz-b-class-w246_wallpaper_02_1920x1200_07-2011.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }

                /** ***************Age Section Between 35 and 44*************** */

                else if (faces[0].appearance["age"] == '35 - 44') {
                    document.getElementById("myImg").src="https://www.mercedes-benz.com/content/dam/brandhub/mercedes-benz/mbsocialcar/mbsocialcar-mercedes-amg-gle-63-s-4matic/amg-gle-63-s-4-matic-wallpaper-03.zip_extracted/04-amg-gle-63-s-4-matic-wallpaper-HD.jpg"
                    document.getElementById("description").innerHTML="All Kinds of Strength with Mercedes GLE "
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("description").innerHTML="All Kinds of Strength with Mercedes GLE "
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = "https://images.wallpaperscraft.com/image/mercedes_benz_gle_450_amg_side_view_108013_3840x2160.jpg"
                        document.getElementById("cartImage").src = "https://images.wallpaperscraft.com/image/mercedes_benz_gle_450_amg_side_view_108013_3840x2160.jpg"
                        $("#myModal").modal();
                        detector.stop()
                    }
                    else if (faces[0].emotions["anger"] > 10) {
                        document.getElementById("description").innerHTML="All Kinds of Strength with Mercedes GLE "
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = 
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("description").innerHTML="All Kinds of Strength with Mercedes GLE "
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src = 
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("description").innerHTML="All Kinds of Strength with Mercedes GLE "
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = "https://www.car-revs-daily.com/wp-content/uploads/2016/05/Mercedes-Benz-GLC-25.jpg";
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                }
                else if (faces[0].appearance["age"] == '55 - 64') {                    
                    if (faces[0].emotions["joy"] >= 80) {
                        document.getElementById("myui").innerHTML = "Happy";
                        document.getElementById("myImg").src = 
                        document.getElementById("cartImage").src = 
                        $("#myModal").modal();
                        detector.stop()
                    }
                    else if (faces[0].emotions["anger"] > 10) {
                        document.getElementById("myui").innerHTML = "Anger";
                        document.getElementById("myImg").src = 
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["dimpler"] > 20) {
                        document.getElementById("myui").innerHTML = "Sad";
                        document.getElementById("myImg").src =
                        setTimeout(function () {
                            detector.reset();
                        }, 3000);
                    }
                    else if (faces[0].expressions["browRaise"] > 50) {
                        document.getElementById("myui").innerHTML = "Surprise";
                        document.getElementById("myImg").src = 
                        setTimeout(function () {
                            ``
                            detector.reset();
                        }, 3000);
                    }
                }
            }
        }
    });
}

function log(node_name, msg) {
    document.getElementById(node_name).innerHTML += "<span>" + msg + "</span><br/>"
}

//function executes when Start button is pushed.
function onStart() {
    if (detector && !detector.isRunning) {
        document.getElementById("logs").innerHTML = ""
        detector.start();
    }
    log('logs', "Clicked the start button");
}

//function executes when the Stop button is pushed.
function onStop() {
    log('logs', "Clicked the stop button");
    if (detector && detector.isRunning) {
        detector.removeEventListener();
        detector.stop();
    }
};

//function executes when the Reset button is pushed.
function onReset() {
    log('logs', "Clicked the reset button");
    if (detector && detector.isRunning) {
        detector.reset();
        document.getElementById("results").innerHTML = ""
    }
}
//Draw the detected facial feature points on the image
function drawFeaturePoints(img, featurePoints) {
    var c = document.getElementById("face_video_canvas");
    if (c == null) return;
    var contxt = c.getContext('2d');

    var hRatio = contxt.canvas.width / img.width;
    var vRatio = contxt.canvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);

    contxt.strokeStyle = "#FFFFFF";
    for (var id in featurePoints) {
        contxt.beginPath();
        contxt.arc(featurePoints[id].x,
            featurePoints[id].y, 2, 0, 2 * Math.PI);
        contxt.stroke();
    }
}