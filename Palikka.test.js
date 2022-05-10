
const randomTetromiinoTyyppi= require("./Palikka.js");


test("Antaa luvun 1-7", () =>{
    expect(randomTetromiinoTyyppi(7).not.toBe(null))
})