const hbs = require('hbs')

hbs.registerHelper('descp_slice', str => {
    const strFirst =  str.slice(0, 60);
    return strFirst;
});

hbs.registerHelper('serialNo', function (options) {
  var currentSerialNo = options.data.root['serialNo'];
  // console.log("############Current serial No is:"+currentSerialNo);
  if (currentSerialNo === undefined) {
    currentSerialNo = 1;  
  } else {
    currentSerialNo++;
  }
  options.data.root['serialNo'] = currentSerialNo;
  return currentSerialNo;
});