let WaterTankNOWATER = 0
let Waterleveltank = 0
let Waterlevelkytka = 0
OLED.init(128, 64)
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
for (let index = 0; index < 3; index++) {
    OLED.writeStringNewLine("Loading.")
    basic.pause(500)
    OLED.writeStringNewLine("Loading..")
    basic.pause(500)
    OLED.writeStringNewLine("Loading...")
    basic.pause(500)
}
basic.clearScreen()
music.playTone(988, music.beat(BeatFraction.Whole))
basic.pause(400)
music.playTone(988, music.beat(BeatFraction.Whole))
basic.forever(function () {
    Waterlevelkytka = Environment.ReadSoilHumidity(AnalogPin.P1)
    Waterleveltank = Environment.ReadWaterLevel(AnalogPin.P2)
    OLED.writeStringNewLine("Flower Level" + ("" + Waterlevelkytka))
    OLED.writeStringNewLine("Tank Level:" + ("" + Waterleveltank))
    basic.pause(5000)
})
/**
 * Když je "WaterTankNOWATER" "0" tak se spustí další command když je "Waterlevelkytka" ">30"
 * 
 * tak se zobrazí text flower is dry a čerpadlo pustí vodu dokud vlhkost pudy nebude 70%
 */
basic.forever(function () {
    if (WaterTankNOWATER == 0) {
        if (Waterlevelkytka > 30) {
            OLED.writeStringNewLine("Flower is dry")
            OLED.writeStringNewLine("Flower Level:" + ("" + Waterlevelkytka))
            basic.pause(2000)
            pins.digitalWritePin(DigitalPin.P3, 1)
            if (Waterlevelkytka == 70) {
                pins.digitalWritePin(DigitalPin.P3, 0)
            }
        }
    }
})
/**
 * Takzavně 
 * 
 * Pokud je v nádrží málo vody konkrétně méně než 30% tak nastaví "WaterTankNOWATER"
 * 
 * na "1" tím se zakáže používaní čerpadla
 * 
 * a napíše ERROR že nemá vodu
 * 
 * Jinak nastaví "WaterTankNOWATER"
 * 
 * "0" Tím pádem se muže používat čerpadlo
 */
basic.forever(function () {
    if (Waterleveltank > 30) {
        WaterTankNOWATER = 1
        OLED.writeStringNewLine("ERROR :" + "Malo vody v nadrzy")
        OLED.writeStringNewLine("Nemuzu zalit kytku")
        OLED.writeStringNewLine("")
        OLED.writeStringNewLine("FIX :" + "Dopln nadrz vodou")
    } else {
        WaterTankNOWATER = 0
    }
})
