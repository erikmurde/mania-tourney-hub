package com.tourneyhub.backend.helper;

public class Constants {

    // Statuses
    public static final String PENDING = "pending";
    public static final String ACCEPTED = "accepted";
    public static final String RETRACTED = "retracted";
    public static final String REGISTERED = "registered";
    public static final String ACTIVE = "active";
    public static final String ELIMINATED = "eliminated";

    // Roles
    public static final String PLAYER = "player";
    public static final String HOST = "host";
    public static final String ADMIN = "admin";
    public static final String REFEREE = "referee";
    public static final String STREAMER = "streamer";
    public static final String COMMENTATOR = "commentator";

    // Beatmap types
    public static final String TB = "TB";

    // Regex
    public static final String URL_REGEX = (
            "^(?:(?:https?|ftp):\\/\\/)(?:www\\.)?[a-z0-9-]+(?:\\.[a-z0-9-]+)+[^\\s]*$"
    );

    // Error messages

    public static final String NO_PERMISSION = "No permission to perform this action!";
}
