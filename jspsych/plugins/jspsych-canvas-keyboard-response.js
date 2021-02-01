/**
 * jspsych-canvas-keyboard-response
 * Chris Jungerius (modified from Josh de Leeuw)
 *
 * a jsPsych plugin for displaying a canvas stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["canvas-keyboard-response"] = (function () {

  var plugin = {};

  plugin.info = {
    name: 'canvas-keyboard-response',
    description: '',
    parameters: {
      stimulus_L: {
        type: jsPsych.plugins.parameterType.FUNCTION,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The drawing function to apply to the canvas. Should take the canvas object as argument.'
      },
      stimulus_R: {
        type: jsPsych.plugins.parameterType.FUNCTION,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The drawing function to apply to the canvas. Should take the canvas object as argument.'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
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
      canvas_size_L: {
        type: jsPsych.plugins.parameterType.INT,
        array: true,
        pretty_name: 'Canvas size',
        default: [300, 600],
        description: 'Array containing the height (first value) and width (second value) of the canvas element.'
      },
      canvas_size_R: {
        type: jsPsych.plugins.parameterType.INT,
        array: true,
        pretty_name: 'Canvas size',
        default: [300, 400],
        description: 'Array containing the height (first value) and width (second value) of the canvas element.'
      },
    }
  }

  plugin.trial = function (display_element, trial) {

    var new_html = '<div id="jspsych-canvas-keyboard-response-stimulus">' + '<canvas id="jspsych-canvas-stimulus-left" height="' + trial.canvas_size_L[0] + '" width="' + trial.canvas_size_L[1] + '"></canvas>' + '<canvas id="jspsych-canvas-stimulus-right" height="' + trial.canvas_size_R[0] + '" width="' + trial.canvas_size_R[1] + '"></canvas>';
    
    // add prompt
    if (trial.prompt !== null) {
      new_html += trial.prompt;
    }

    // draw
    display_element.innerHTML = new_html;
    let c = document.getElementById("jspsych-canvas-stimulus-left")
    trial.stimulus_L(c)
    let d = document.getElementById("jspsych-canvas-stimulus-right")
    trial.stimulus_R(d)

    // store response
    var response = {
      rt: null,
      key: null
    };

    var selected_color = 'rgb(5, 157, 190)';
    var display_selection = function () {
      var selected;
      if (String.fromCharCode(response.key) == trial.choices[0]) {
        selected = '#jspsych-canvas-stimulus-left';
        $(selected).css('border', `18px solid ${selected_color}`);
      } else {
        selected = '#jspsych-canvas-stimulus-right';
        $(selected).css('border', `18px solid ${selected_color}`);
      }
    };


    // function to end trial when it is time
    var end_trial = function () {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      display_selection();

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "key_press": response.key
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

      if (trial.response_ends_trial) {
        end_trial();
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
