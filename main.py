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
basic.pause(500)
music.play_tone(988, music.beat(BeatFraction.WHOLE))

def on_forever():
    global Waterlevelkytka, Waterleveltank
    Waterlevelkytka = Environment.read_soil_humidity(AnalogPin.P1)
    Waterleveltank = Environment.read_water_level(AnalogPin.P2)
    OLED.write_string_new_line("Flower Level" + str(Waterlevelkytka))
    OLED.write_string_new_line("Tank Level:" + str(Waterleveltank))
    basic.pause(5000)
    if Waterlevelkytka > 30:
        OLED.write_string_new_line("Flower is dry")
        OLED.write_string_new_line("Flower Level:" + str(Waterlevelkytka))
        basic.pause(2000)
        pins.digital_write_pin(DigitalPin.P3, 1)
        if Waterlevelkytka == 70:
            pins.digital_write_pin(DigitalPin.P3, 0)
    if Waterleveltank > 30:
        OLED.write_string_new_line("ERROR :" + "Water level in tank is too low")
        OLED.write_string_new_line("I can't start a creep sequence")
        OLED.write_string_new_line("")
        OLED.write_string_new_line("FIX :" + "Refill the tank")
basic.forever(on_forever)
