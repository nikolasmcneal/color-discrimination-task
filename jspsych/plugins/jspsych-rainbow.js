/**
 * jspsych-canvas-keyboard-response
 * Chris Jungerius (modified from Josh de Leeuw)
 *
 * a jsPsych plugin for displaying a canvas stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["rainbow"] = (function () {

  var plugin = {};

  plugin.info = {
    name: 'rainbow',
    description: '',
    parameters: {
      rainbow_parameter: {
        type: jsPsych.plugins.parameterType.FUNCTION,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The drawing function to apply to the canvas. Should take the canvas object as argument.'
      },
      rainbow_values_parameter: {
        type: jsPsych.plugins.parameterType.FUNCTION,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The drawing function to apply to the canvas. Should take the canvas object as argument.'
      },
      text_parameter: {
        type: jsPsych.plugins.parameterType.FUNCTION,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The drawing function to apply to the canvas. Should take the canvas object as argument.'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: ['F'],
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },
    }
  }

  plugin.trial = function (display_element, trial) {

    var leftbool = false;
    var rightbool = false;
    var new_html;
    new_html = '<div id="jspsych-canvas-keyboard-response-stimulus" style = "position: absolute; margin-left: auto; margin-right: auto; left: 0; right: 0; top: 450px; text-align: center;">' 
    new_html += '<canvas id="jspsych-rainbow"  height="' + 150 + '" width="' + 1300 + '"style = "padding: 0; margin: auto; display: block; width = 350px; height = 225px; position: absolute; top: 100; bottom: 0; left: 60px; right: 0; text-align: center;" ></canvas>'
    new_html += '<canvas id="jspsych-rainbow-values"  height="' + 150 + '" width="' + 1300 + '"style = "padding: 0; margin: auto; display: block; width = 350px; height = 225px; position: absolute; top: -100; bottom: 0; left: 60px; right: 0; text-align: center;" ></canvas>'
    new_html += '<canvas id="jspsych-text"  height="' + 150 + '" width="' + 1300 + '"style = "padding: 0; margin: auto; display: block; width = 350px; height = 225px; position: relative; top: 200; bottom: 0; left: 60px; right: 0; text-align: center;" ></canvas>'
    
    
    //new_html += '<div id="canvas-borders>"'
    new_html += '<canvas id="canvas-border-left"  height="' + 235 + '" width="' + 360 + '"style = "padding: 0; margin: auto; display: block; width = 360px; height = 225px; position: absolute; top: 0; bottom: 0; left: -700px; right: 0; text-align: center;" ></canvas>'
    new_html += '<canvas id="canvas-border-right" height="' + 235 + '" width="' + 360 + '"style = "padding: 0; margin: auto; display: block; width = 360px; height = 225px; position: absolute; top: 0; bottom: 0; left: 700px; right: 0; text-align: center;" ></canvas>'
    //new_html += '</div>'
    var setTimeoutHandlers = [];
    // add prompt
    if (trial.prompt !== null) {
      new_html += trial.prompt;
    }

    // draw
    display_element.innerHTML = new_html;

    let z = document.getElementById("jspsych-rainbow")
    trial.rainbow_parameter(z)

    let rv = document.getElementById("jspsych-rainbow-values")
    trial.rainbow_values_parameter(rv)

    let t = document.getElementById("jspsych-text")
    trial.text_parameter(t)

    // store response
    var response = {
      rt: null,
      key: null
    };

    var selected_color = 'rgb(255,255,255)';
    var canvas_borders = document.getElementById('canvas-borders');

    // var display_selection = function () {
    //   var selected;
    //   if (String.fromCharCode(response.key) == trial.choices[0].toUpperCase()) {
    //     selected = '#canvas-border-left';
    //     $(selected).css('border', `18px solid black`);
    //     selected2 = '#jspsych-white';
    //     $(selected2).remove();
    //     //import { j } from './index.html'
    //     //console.log(j);
    //   } else if(String.fromCharCode(response.key) == trial.choices[1].toUpperCase()) {
    //     selected = '#canvas-border-right';
    //     $(selected).css('border', `18px solid black`);
    //     selected2 = '#jspsych-white';
    //     $(selected2).remove();
    //     //console.log(j);
    //     // console.log(String.fromCharCode(response.key))
    //     // console.log(trial.choices[0].toUpperCase())
    //     // console.log(String.fromCharCode(response.key) == trial.choices[0])
    //   }
    // };

    var display_timeout = function () {
      $('binary-timeoutinfo').text('Time out!');
    };

    var kill_timers = function () {
      for (var i = 0; i < setTimeoutHandlers.length; i++) {
        clearTimeout(setTimeoutHandlers[i]);
      }
    };

    var kill_listeners = function () {
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }
    };

    var start_response_listener = function () {
      if (trial.choices != jsPsych.NO_KEYS) {
        keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          valid_responses: trial.choices,
          rt_method: 'performance',
          persist: false,
          allow_held_key: false,
          callback_function: function (info) {
            kill_listeners();
            kill_timers();
            response = info;
            //display_selection();
            setTimeout(() => end_trial(false), 500);
          },
        });
      }
    };



    // function to end trial when it is time
    var end_trial = function () {

      // kill any remaining setTimeout handlers


      // kill keyboard listeners
      kill_listeners();

      //display_selection();

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "key_press": response.key,
      };



      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function (info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-canvas-keyboard-response-stimulus').className += ' responded';

      // only record the first response
      if (response.key == null) {
        response = info;
      }
      //display_selection();
      // TO END TRIAL:
      
      if (trial.response_ends_trial) {
         setTimeout(() => end_trial(false), 0);
       }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }

    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function () {
        display_element.querySelector('#jspsych-canvas-keyboard-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function () {
        end_trial();
      }, trial.trial_duration);
    }

  };

  return plugin;
})();
