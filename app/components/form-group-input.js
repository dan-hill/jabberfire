import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['form-group'],
  inputErrors: function(errors){
    for(var error in errors){
      console.log(error);
    }
  }
});
