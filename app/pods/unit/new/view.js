import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
    var qrcode = new QRCode("qrcode", {
      text: this.get('controller.asset.name') + '::' + this.get('controller.tag'),
      width: 250,
      height: 250,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });

    qrcode.makeCode();
  }
});
