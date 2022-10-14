input.onButtonPressed(Button.A, function () {
    STOP = 1
    OLED.clear()
    OLED.writeStringNewLine("STOPED")
    basic.showIcon(IconNames.No)
    music.playTone(988, music.beat(BeatFraction.Double))
})
// Po zmáčknutí A+B
// 
// Se všechno zastaví
input.onButtonPressed(Button.B, function () {
    STOP = 0
    OLED.clear()
    OLED.writeStringNewLine("STARTED")
    basic.showIcon(IconNames.Yes)
    music.playTone(988, music.beat(BeatFraction.Whole))
    basic.pause(400)
    music.playTone(988, music.beat(BeatFraction.Whole))
    OLED.clear()
})
let WaterTankNOWATER = 0
let Waterleveltank = 0
let Waterlevelkytka = 0
let STOP = 0
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
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    if (STOP == 0) {
        Waterlevelkytka = Environment.ReadSoilHumidity(AnalogPin.P1)
        Waterleveltank = Environment.ReadWaterLevel(AnalogPin.P2)
        OLED.writeStringNewLine("Flower Level" + ("" + Waterlevelkytka))
        OLED.writeStringNewLine("Tank Level:" + ("" + Waterleveltank))
        basic.pause(5000)
    }
})
// Když je "WaterTankNOWATER" "0" tak se spustí další command když je "Waterlevelkytka" ">30"
// 
// tak se zobrazí text flower is dry a čerpadlo pustí vodu dokud vlhkost pudy nebude 70%
basic.forever(function () {
    if (STOP == 0) {
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
    }
})
// Takzavně
// 
// Pokud je v nádrží málo vody konkrétně méně než 30% tak nastaví "WaterTankNOWATER"
// 
// na "1" tím se zakáže používaní čerpadla
// 
// a napíše ERROR že nemá vodu
// 
// Jinak nastaví "WaterTankNOWATER"
// 
// "0" Tím pádem se muže používat čerpadlo
// 
// když
basic.forever(function () {
    if (STOP == 0) {
        if (Waterleveltank > 30) {
            WaterTankNOWATER = 1
            OLED.writeStringNewLine("ERROR :" + "Malo vody v nadrzy")
            OLED.writeStringNewLine("ERROR :" + "Nemuzu zalit kytku")
            OLED.writeStringNewLine("")
            OLED.writeStringNewLine("FIX :" + "Dopln nadrz vodou")
        } else {
            WaterTankNOWATER = 0
        }
    }
})
basic.forever(function () {
    OLED.writeStringNewLine("Den:" + ("" + RTC_DS1307.getTime(RTC_DS1307.TimeType.DAY)))
    OLED.writeStringNewLine("Hodiny:" + ("" + RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR)) + ("" + RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR)))
    OLED.writeStringNewLine("Rok:" + ("" + RTC_DS1307.getTime(RTC_DS1307.TimeType.YEAR)))
})
