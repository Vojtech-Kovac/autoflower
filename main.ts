input.onButtonPressed(Button.A, function () {
    STOP = 0
    OLED.clear()
    OLED.writeStringNewLine("STARTED")
    basic.showIcon(IconNames.Yes)
    music.playTone(988, music.beat(BeatFraction.Whole))
    basic.pause(400)
    music.playTone(988, music.beat(BeatFraction.Whole))
    OLED.clear()
})
// Po zmáčknutí A+B
// 
// Se všechno zastaví
input.onButtonPressed(Button.B, function () {
    STOP = 1
    OLED.clear()
    OLED.writeStringNewLine("STOPED")
    basic.showIcon(IconNames.No)
    music.playTone(988, music.beat(BeatFraction.Double))
})
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
OLED.drawLoading(25)
basic.pause(200)
OLED.drawLoading(50)
basic.pause(200)
OLED.drawLoading(75)
basic.pause(100)
OLED.drawLoading(100)
music.playTone(988, music.beat(BeatFraction.Whole))
basic.pause(400)
music.playTone(988, music.beat(BeatFraction.Whole))
basic.showIcon(IconNames.Yes)
let stop_basic_info = 0
OLED.clear()
basic.forever(function () {
    Waterlevelkytka = Environment.ReadSoilHumidity(AnalogPin.P1)
    Waterleveltank = Environment.ReadWaterLevel(AnalogPin.P3)
})
basic.forever(function () {
    if (stop_basic_info == 0) {
        if (STOP == 0) {
            OLED.writeStringNewLine("Flower Level:" + Waterlevelkytka)
            OLED.writeStringNewLine("Tank Level:" + Waterleveltank)
        }
        basic.pause(5000)
        OLED.clear()
    }
})
// Když je "WaterTankNOWATER" "0" tak se spustí další command když je "Waterlevelkytka" ">30"
// 
// tak se zobrazí text flower is dry a čerpadlo pustí vodu dokud vlhkost pudy nebude 70%
basic.forever(function () {
    if (STOP == 0) {
        let WaterTankNOWATER = 0
        if (WaterTankNOWATER == 0) {
            if (Waterlevelkytka < 30) {
                stop_basic_info = 1
                OLED.drawLoading(Waterlevelkytka)
                basic.pause(2000)
                OLED.clear()
                if (Waterlevelkytka < 70) {
                    stop_basic_info = 1
                    pins.digitalWritePin(DigitalPin.P2, 1)
                } else {
                    pins.digitalWritePin(DigitalPin.P2, 0)
                    stop_basic_info = 0
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
	
})
basic.forever(function () {
	
})
