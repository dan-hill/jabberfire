import Ember from 'ember';

export function foreach(params/*, hash*/) {
  return params;
}

export default Ember.HTMLBars.makeBoundHelper(foreach, function (array, fn) {
  var total = array.length;
  var buffer = '';

  //Better performance: http://jsperf.com/for-vs-foreach/2
  for (var i = 0, j = total; i < j; i++) {
    var item = array[i];

    // stick an index property onto the item, starting with 1, may make configurable later
    item['_index'] = i+1;
    item['_total'] = total;
    item['_isFirst'] = (i === 0);
    item['_isLast'] = (i === (total - 1));

    // show the inside of the block
    buffer += fn.fn(item);
  }

  // return the finished buffer
  return buffer;
});
