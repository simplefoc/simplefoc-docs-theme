var libraires =[
    "SimpleFOC.h",
    "PciManager.h",
    "PciListenerImp.h",
    "ESP32Encoder.h",
    "Encoder.h",
    "FOCutils.h",
    "BLDCMotor.h",
    "StepperMotor.h",
    "HallSensor.h",
    "MagneticSensor.h",
    "MagneticSensorSPI.h",
    "MagneticSensorI2C.h",
    "MagneticSensorPWM.h",
    "MagneticSensorAnalog.h",
    "LowsideCurrentSense.h",
    "InlineCurrentSense.h",
    "MySensor.h",
    "Sensor.h",
    "SimpleFOCDrivers.h",
    "MagneticSensorAS5048A.h"
]

var defines =[
    "DEF_POWER_SUPPLY",
    "DEF_PID_VEL_P",
    "DEF_PID_VEL_I",
    "DEF_PID_VEL_D",
    "DEF_P_ANGLE_P",
    "DEF_PID_VEL_U_RAMP",
    "DEF_P_ANGLE_VEL_LIM",
    "DEF_INDEX_SEARCH_TARGET_VELOCITY",
    "DEF_VOLTAGE_SENSOR_ALIGN",
    "DEF_VEL_FILTER_Tf",
    "INH_A",
    "INH_B",
    "INH_C",
    "INL_A",
    "INL_B",
    "INL_C",
    "EN_GATE ",
    "M_PWM",
    "M_OC",
    "OC_ADJ",
    "SPI_MODE0",
    "_MON_TARGET",
    "_MON_VOLT_Q",
    "_MON_VOLT_D",
    "_MON_CURR_Q",
    "_MON_CURR_D",
    "_MON_VEL",
    "_MON_ANGLE",
    "_ACTIVE",
    "_HIGH_IMPEDANCE",
    "_HIGH_Z",
    "_PI",
    "_2PI",
    "HIGH",
    "LOW",
    "DEF_VEL_LIM",
    "_NC"
]

var classNames = [
    "BLDCMotor",
    "StepperMotor",
    "HybridStepperMotor",
    "BLDCDriver3PWM",
    "SimpleFOCDebug",
    "BLDCDriver6PWM",
    "StepperDriver4PWM",
    "StepperDriver2PWM",
    "BLCDriverXPWM",
    "StepperDriverXPWM",
    "Encoder",
    "MagneticSensor",
    "MagneticSensorSPI",
    "MagneticSensorI2C",
    "MagneticSensorAnalog",
    "MagneticSensorPWM",
    "HallSensor",
    "PciListenerImp",
    "PciManager",
    "Serial",
    "MySensor",
    "Wire",
    "SPIClass",
    "LowPassFilter",
    "PIDController",
    "InlineCurrentSense",
    "LowsideCurrentSense",
    "CurrentSense",
    "StepDirListener",
    "Commander",
    "GenericSensor"
];

var classProps = [
    "PID_velocity",
    "P_angle",
    "LPF_velocity",
    "P",
    "I",
    "Tf",
    "D",
    "output_ramp",
    "quadrature",
    "pullup",
    "voltage_limit",
    "current_limit",
    "voltage_power_supply",
    "controller",
    "index_search_velocity",
    "controller",
    "velocity_limit",
    "skip_align",
    "monitor_start_char",
    "monitor_end_char"
];

var funcNames = [
    "init",
    "initFOC",
    "enableInterrupts",
    "handleA",
    "handleB",
    "handleIndex",
    "handleC",
    "registerListener",
    "linkSensor",
    "linkDriver",
    "useMonitoring",
    "monitor",
    "print",
    "monitor_port",
    "println",
    "getVelocity",
    "update",
    "getAngle",
    "loopFOC",
    "move",
    "constrainAngle",
    "controllerLQR",
    "sign",
    "shaftVelocity",
    "needsSearch",
    "command",
    "setPhaseVoltage",
    "_delay",
    "_micros",
    "shaftAngle",
    "absoluteZeroAlign",
    "electricAngle",
    "alignSensor",
    "alignCurrentSense",
    "updateLoopFOCTime",
    "normalizeAngle",
    "_sin",
    "_cos",
    "setPwm",
    "positionP",
    "velocityPID",
    "controllerPID",
    "serialReceiveUserCommand",
    "disable",
    "pinMode",
    "digitalWrite",
    "constrain",
    "linkCurrentSense",
    "getCurrent",
    "getPhaseCurrents",
    "getFOCCurrents",
    "getDCCurrent",
    "driverAlign",
    "setPhaseState",
    "handle",
    "enableInterrupt",
    "getValue",
    "attach",
    "run",
    "add",
    "pid",
    "lpf",
    "scalar",
    "motion",
    "target",
    "motor",
    "SIMPLEFOC_DEBUG",
    "characteriseMotor",
    "tuneCurrentController",
    "custom",
    "linkCustomMotionControl",
    "updateVoltageLimit",
    "updateCurrentLimit",
    "updateVelocityLimit",
    "controller",
    "torque_controller"

];
var structNames = [
    "Pullup",
    "Quadrature",
    "ControlType",
    "FOCModulationType",
    "MagneticSensorSPIConfig_s",
    "MagneticSensorI2CConfig_s",
    "PhaseCurrent_s",
    "DQCurrent_s",
    "TorqueControlType",
    "MotionControlType",
    "Direction",
    "DQVoltage_s",
    "VerboseMode",
    "FOCMotorStatus"
];
var structProps = [
    "USE_EXTERN",
    "USE_INTERN",
    "ON",
    "OFF",
    "ENABLE",
    "DISABLE",
    "angle",
    "velocity",
    "angle_openloop",
    "velocity_openloop",
    "voltage",
    "SpaceVectorPWM",
    "SinePWM",
    "Trapezoid_120",
    "Trapezoid_150",
    "dc_current",
    "foc_current",
    "estimated_current",
    "torque",
    "CW",
    "CCW",
    "nothing",
    "on_request",
    "user_friendly",
    "machine_readable",
    "angle_nocascade",
    "custom",
    "motor_ready"
];
jtd.onReady(function(){
    document.querySelectorAll('.n').forEach(function(e) {
        if(classNames.indexOf(e.innerHTML) >= 0 ){
            e.classList.remove("n");
            e.classList.add("className");
        } else if(funcNames.indexOf(e.innerHTML) >= 0 ){
            e.classList.remove("n");
            e.classList.add("fcnName");
        } else if(structNames.indexOf(e.innerHTML) >= 0 ){
            e.classList.remove("n");
            e.classList.add("structName");
        } else if(structProps.indexOf(e.innerHTML) >= 0 ){
            e.classList.remove("n");
            e.classList.add("structProp");
        } else if(classProps.indexOf(e.innerHTML) >= 0 ){
            e.classList.remove("n");
            e.classList.add("classProps");
        }else if(defines.indexOf(e.innerHTML) >= 0 ){
            e.classList.remove("n");
            e.classList.add("defines");
        }
    });

    //include style
    document.querySelectorAll('.cp').forEach(function(e) {
        var str = e.innerHTML;

        // // show libraries
        // libraires.forEach(function(lib){
        //     str = str.replace( lib ,"<span class='incLib'>" +lib + "</span>" );
        // }); 

        // show defines
        defines.forEach(function(def){
            str = str.replace( def ,"<span class='defines'>" +def + "</span>" );
        }); 
        
        
        // enable comments & defines
        a = str.split('\n');
        a.forEach((element,index) => {
            element = element.replace( /(\/\/)/ ,"<span class='c1'> //" ) + "</span>";
            a[index] = element.replace( "#define" ,"<span class='k'>#define </span> " );
        });

        str = a.join('\n');

        e.innerHTML = str;
    });
});



function show(id,cls){
    Array.from(document.getElementsByClassName(cls)).forEach(
    function(e){e.style.display = "none";});
    console.log(Array.from(document.getElementsByClassName(cls+"-"+id)));
    Array.from(document.getElementsByClassName(cls+"-"+id)).forEach(
    function(e){e.style.display = "block";});
    Array.from(document.getElementsByClassName("btn-"+cls)).forEach(
    function(e){e.classList.remove("btn-primary");});
    Array.from(document.getElementsByClassName("btn-"+id)).forEach(
    function(e){e.classList.add("btn-primary");});
    var elmnt = document.getElementById("btn-"+id);
    if(elmnt) elmnt.classList.add("btn-primary");
}

document.addEventListener('DOMContentLoaded', function() {
    const currentUrl = window.location.pathname;
    const navItems = document.querySelectorAll('.navigation-list-item[data-url]');
    let activeItem = null;

    // Find the active item (current page)
    navItems.forEach(item => {
        const itemUrl = item.dataset.url;
        if (currentUrl === itemUrl) {
            activeItem = item;
        }
    });

    if (activeItem) {
        // Show all ancestors of active item
        let parent = activeItem.closest('ul').closest('.navigation-list-item');
        while (parent) {
            const childList = parent.querySelector(':scope > .navigation-list-child-list');
            if (childList) {
                childList.style.display = 'block';
            }
            parent = parent.closest('ul').closest('.navigation-list-item');
        }

        // Show children of active item
        const activeChildList = activeItem.querySelector(':scope > .navigation-list-child-list');
        if (activeChildList) {
            activeChildList.style.display = 'block';
        }

        // Highlight ONLY the active link
        const link = activeItem.querySelector('.navigation-list-link');
        if (link) {
            link.classList.add('active');
        }
    }
});



  document.addEventListener('DOMContentLoaded', function() {
    // Add copy buttons to all code blocks
    document.querySelectorAll('pre.highlight, figure.highlight').forEach(function(codeBlock) {
      // Skip if already processed
      if (codeBlock.parentElement.classList.contains('code-wrapper')) {
        return;
      }
      
      // Skip shell/bash code blocks - check parent elements
      let parent = codeBlock.parentElement;
      let isShellCode = false;
      while (parent) {
        if (parent.classList && (parent.classList.contains('language-sh') || 
                                 parent.classList.contains('language-bash') || 
                                 parent.classList.contains('language-shell'))) {
          isShellCode = true;
          break;
        }
        parent = parent.parentElement;
      }
      if (isShellCode) {
        return;
      }
      
      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'code-wrapper';
      wrapper.style.position = 'relative';
      
      // Create copy button (no header)
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-code-button';
      copyButton.textContent = 'Copy';
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');
      
      // Wrap the code block
      codeBlock.parentNode.insertBefore(wrapper, codeBlock);
      wrapper.appendChild(codeBlock);
      wrapper.appendChild(copyButton);
      
      // Add click handler
      copyButton.addEventListener('click', function() {
        const code = codeBlock.querySelector('code') || codeBlock;
        const text = code.textContent;
        
        navigator.clipboard.writeText(text).then(function() {
          copyButton.textContent = 'Copied!';
          copyButton.classList.add('copied');
          
          setTimeout(function() {
            copyButton.textContent = 'Copy';
            copyButton.classList.remove('copied');
          }, 2000);
        }).catch(function(err) {
          console.error('Failed to copy:', err);
          copyButton.textContent = 'Failed';
          setTimeout(function() {
            copyButton.textContent = 'Copy';
          }, 2000);
        });
      });
    });
  });