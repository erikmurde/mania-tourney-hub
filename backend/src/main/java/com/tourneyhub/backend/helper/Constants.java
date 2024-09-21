package com.tourneyhub.backend.helper;

import java.util.HashMap;

public class Constants {

    // Roles
    public static final String PLAYER = "player";
    public static final String HOST = "host";
    public static final String ADMIN = "admin";
    public static final String MAPPOOLER = "mappooler";
    public static final String MAPPER = "mapper";
    public static final String PLAYTESTER = "playtester";
    public static final String REFEREE = "referee";
    public static final String STREAMER = "streamer";
    public static final String COMMENTATOR = "commentator";
    public static final String SHEETER = "sheeter";
    public static final String GFX = "gfx";

    public static final HashMap<String, Boolean> roleCanReg = new HashMap<>();

    static {
        roleCanReg.put(PLAYER, false);
        roleCanReg.put(HOST, false);
        roleCanReg.put(ADMIN, false);
        roleCanReg.put(MAPPOOLER, false);
        roleCanReg.put(MAPPER, false);
        roleCanReg.put(PLAYTESTER, false);
        roleCanReg.put(REFEREE, false);
        roleCanReg.put(STREAMER, true);
        roleCanReg.put(COMMENTATOR, true);
        roleCanReg.put(SHEETER, false);
        roleCanReg.put(GFX, false);
    }

    // Regex
    public static final String URL_REGEX = (
            "^(?:(?:https?|ftp):\\/\\/)(?:www\\.)?[a-z0-9-]+(?:\\.[a-z0-9-]+)+[^\\s]*$"
    );
}
