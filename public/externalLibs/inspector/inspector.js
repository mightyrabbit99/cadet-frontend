;(function(exports) {
  var container = document.createElement('div')
  container.id = 'inspector-container'

  var builtins = [
    'runtime',
    'display',
    'raw_display',
    'stringify',
    'error',
    'prompt',
    'is_number',
    'is_string',
    'is_function',
    'is_boolean',
    'is_undefined',
    'parse_int',
    'undefined',
    'NaN',
    'Infinity',
    'null',
    'pair',
    'is_pair',
    'head',
    'tail',
    'is_null',
    'is_list',
    'list',
    'length',
    'map',
    'build_list',
    'for_each',
    'list_to_string',
    'reverse',
    'append',
    'member',
    'remove',
    'remove_all',
    'filter',
    'enum_list',
    'list_ref',
    'accumulate',
    'equal',
    'draw_data',
    'set_head',
    'set_tail',
    'array_length',
    'is_array',
    'parse',
    'apply_in_underlying_javascript',
    'is_object',
    'is_NaN',
    'has_own_property',
    'alert',
    'timed',
    'assoc',
    'rawDisplay',
    'prompt',
    'alert',
    'visualiseList',
    'math_abs',
    'math_acos',
    'math_acosh',
    'math_asin',
    'math_asinh',
    'math_atan',
    'math_atanh',
    'math_atan2',
    'math_ceil',
    'math_cbrt',
    'math_expm1',
    'math_clz32',
    'math_cos',
    'math_cosh',
    'math_exp',
    'math_floor',
    'math_fround',
    'math_hypot',
    'math_imul',
    'math_log',
    'math_log1p',
    'math_log2',
    'math_log10',
    'math_max',
    'math_min',
    'math_pow',
    'math_random',
    'math_round',
    'math_sign',
    'math_sin',
    'math_sinh',
    'math_sqrt',
    'math_tan',
    'math_tanh',
    'math_trunc',
    'math_E',
    'math_LN10',
    'math_LN2',
    'math_LOG10E',
    'math_LOG2E',
    'math_PI',
    'math_SQRT1_2',
    'math_SQRT2'
  ]

  setInterval(()=>{
    if(document.getElementById("inspector-container") != null){
      document.getElementById("Inspector-icon").classList.remove("side-content-header-button-alert");
    }
  },1000)

  function updateContext(context) {
    function dumpTable(env) {
      var res = ''
      for (var k in env) {
        if (builtins.indexOf(''+k) < 0) {
          res += '<tr><td>' + k + '</td>' + '<td><code>' + env[k] + '</code></td></tr>'
        }
      }
      return res.length > 0 ? res : undefined
    }
    try {
      var frames = context.context.runtime.environments
      container.innerHTML = ""

      for (var i = 0; i < frames.length; ++i){
        var envtoString = dumpTable(frames[i].head)
        if (envtoString == undefined){
          console.log("[Inspector] Skipped empty frame: " + frames[i].name)
          continue
        }
        var newtable = document.createElement("table");
        var tbody = document.createElement("tbody");
        tbody.id = "inspect-scope"
        tbody.innerHTML = "</br><caption><strong>Frame: " + frames[i].name + "</strong></caption>" + envtoString
        newtable.appendChild(tbody)
        container.appendChild(newtable)
        document.getElementById("Inspector-icon").classList.toggle("side-content-header-button-alert");
      }
    } catch (e) {
      container.innerHTML = e
    }
  }

  exports.Inspector = {
    init: function(parent) {
      parent.appendChild(container)
    },
    updateContext
  }
  setTimeout(() => {}, 1000)
})(window)
