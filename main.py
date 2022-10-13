WaterTankNOWATER = 0
Waterleveltank = 0
Waterlevelkytka = 0
OLED.init(128, 64)
basic.show_leds("""
    # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
""")
for index in range(3):
    OLED.write_string_new_line("Loading.")
    basic.pause(500)
    OLED.write_string_new_line("Loading..")
    basic.pause(500)
    OLED.write_string_new_line("Loading...")
    basic.pause(500)
basic.clear_screen()
music.play_tone(988, music.beat(BeatFraction.WHOLE))
basic.pause(400)
music.play_tone(988, music.beat(BeatFraction.WHOLE))

def on_forever():
    global Waterlevelkytka, Waterleveltank
    Waterlevelkytka = Environment.read_soil_humidity(AnalogPin.P1)
    Waterleveltank = Environment.read_water_level(AnalogPin.P2)
    OLED.write_string_new_line("Flower Level" + ("" + str(Waterlevelkytka)))
    OLED.write_string_new_line("Tank Level:" + ("" + str(Waterleveltank)))
    basic.pause(5000)
basic.forever(on_forever)

"""

Když je "WaterTankNOWATER" "0" tak se spustí další command když je "Waterlevelkytka" ">30"

tak se zobrazí text flower is dry a čerpadlo pustí vodu dokud vlhkost pudy nebude 70%

"""

def on_forever2():
    if WaterTankNOWATER == 0:
        if Waterlevelkytka > 30:
            OLED.write_string_new_line("Flower is dry")
            OLED.write_string_new_line("Flower Level:" + ("" + str(Waterlevelkytka)))
            basic.pause(2000)
            pins.digital_write_pin(DigitalPin.P3, 1)
            if Waterlevelkytka == 70:
                pins.digital_write_pin(DigitalPin.P3, 0)
basic.forever(on_forever2)

"""

Takzavně 

Pokud je v nádrží málo vody konkrétně méně než 30% tak nastaví "WaterTankNOWATER"

na "1" tím se zakáže používaní čerpadla

a napíše ERROR že nemá vodu

Jinak nastaví "WaterTankNOWATER"

"0" Tím pádem se muže používat čerpadlo

"""

def on_forever3():
    global WaterTankNOWATER
    if Waterleveltank > 30:
        WaterTankNOWATER = 1
        OLED.write_string_new_line("ERROR :" + "Malo vody v nadrzy")
        OLED.write_string_new_line("Nemuzu zalit kytku")
        OLED.write_string_new_line("")
        OLED.write_string_new_line("FIX :" + "Dopln nadrz vodou")
    else:
        WaterTankNOWATER = 0
basic.forever(on_forever3)
