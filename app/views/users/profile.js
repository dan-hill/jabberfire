import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'users/profile',
  didInsertElement: function() {
    Profile.init();
  }
});
