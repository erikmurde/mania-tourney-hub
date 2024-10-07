package com.tourneyhub.backend.helper;

import java.util.HashMap;

public class Constants {

    // Statuses
    public static final String PENDING = "pending";
    public static final String ACCEPTED = "accepted";
    public static final String RETRACTED = "retracted";
    public static final String REGISTERED = "registered";
    public static final String ACTIVE = "active";
    public static final String ELIMINATED = "eliminated";
    public static final String DISQUALIFIED = "disqualified";

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

    public static final HashMap<String, Boolean> ROLE_CAN_REG = new HashMap<>();

    static {
        ROLE_CAN_REG.put(PLAYER, false);
        ROLE_CAN_REG.put(HOST, false);
        ROLE_CAN_REG.put(ADMIN, false);
        ROLE_CAN_REG.put(MAPPOOLER, false);
        ROLE_CAN_REG.put(MAPPER, false);
        ROLE_CAN_REG.put(PLAYTESTER, false);
        ROLE_CAN_REG.put(REFEREE, false);
        ROLE_CAN_REG.put(STREAMER, true);
        ROLE_CAN_REG.put(COMMENTATOR, true);
        ROLE_CAN_REG.put(SHEETER, false);
        ROLE_CAN_REG.put(GFX, false);
    }

    // Beatmap types
    public static final String TB = "TB";

    // Regex
    public static final String URL_REGEX = (
            "^(?:(?:https?|ftp):\\/\\/)(?:www\\.)?[a-z0-9-]+(?:\\.[a-z0-9-]+)+[^\\s]*$"
    );

    // Error messages

    public static final String NO_PERMISSION = "No permission to perform this action!";
}
