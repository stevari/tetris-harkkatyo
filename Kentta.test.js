const rotate = require('./Kentta.js');

test("Ottaa palikasta kopion, rotatoi sitä muuttammalla arvoja ja palauttaa kopion", () =>{
    expect(rotate().not.toBe(null))
})