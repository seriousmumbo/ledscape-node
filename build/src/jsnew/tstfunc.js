function firstarg(func) {
  var st = (func.toString().split('\n')[0]);
  var tokens = st.split('(');
  var name = tokens[1].split(')')[0];
  return name;
}

