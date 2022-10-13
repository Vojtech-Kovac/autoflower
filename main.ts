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
basic.pause(500)
music.playTone(988, music.beat(BeatFraction.Whole))
basic.forever(function () {
    Waterlevelkytka = Environment.ReadSoilHumidity(AnalogPin.P1)
    Waterleveltank = Environment.ReadWaterLevel(AnalogPin.P2)
    OLED.writeStringNewLine("Flower Level" + ("" + Waterlevelkytka))
    OLED.writeStringNewLine("Tank Level:" + ("" + Waterleveltank))
    basic.pause(5000)
    if (Waterlevelkytka > 30) {
        OLED.writeStringNewLine("Flower is dry")
        OLED.writeStringNewLine("Flower Level:" + ("" + Waterlevelkytka))
        basic.pause(2000)
        pins.digitalWritePin(DigitalPin.P3, 1)
        if (Waterlevelkytka == 70) {
            pins.digitalWritePin(DigitalPin.P3, 0)
        }
    }
    if (Waterleveltank > 30) {
        OLED.writeStringNewLine("ERROR :" + "Malo vody v nadrzy")
        OLED.writeStringNewLine("Nemuzu zalit kytku")
        OLED.writeStringNewLine("")
        OLED.writeStringNewLine("FIX :" + "Dopln nadrz vodou")
    }
})
