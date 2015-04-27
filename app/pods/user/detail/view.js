import Ember from 'ember';

export default Ember.View.extend({
  tagName: '',
  templateName: 'user/detail',
  didInsertElement: function() {

    TableAdvanced.init();

  }
});
