package com.tourneyhub.backend.controller;

import com.tourneyhub.backend.dto.map.InMappoolUpdateDto;
import com.tourneyhub.backend.dto.map.MapDto;
import com.tourneyhub.backend.dto.map.SubmittedMapDto;
import com.tourneyhub.backend.service.MapService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MapController {

    private final MapService service;

    public MapController(MapService service) {
        this.service = service;
    }

    @GetMapping("/api/maps/stage/{stageId}")
    public List<MapDto> getAllByStageId(@PathVariable Long stageId) {
        return service.getAllByStageId(stageId);
    }

    @GetMapping("/api/maps/stage/{stageId}/inMappool")
    public List<MapDto> getAllInMappoolByStageId(@PathVariable Long stageId) {
        return service.getAllInMappoolByStageId(stageId);
    }

    @PostMapping("/api/maps/submitted")
    public void createSubmitted(@RequestBody SubmittedMapDto map, @AuthenticationPrincipal OAuth2User principal) {
        service.createSubmitted(map, principal.getAttribute("username"));
    }

    @PostMapping("/api/maps/unsubmitted")
    public void createUnsubmitted(@RequestBody MapDto map, @AuthenticationPrincipal OAuth2User principal) {
        service.createUnsubmitted(map, principal.getAttribute("username"));
    }

    @PutMapping("/api/maps/submitted/{mapId}")
    public void updateSubmitted(@PathVariable Long mapId, @RequestBody SubmittedMapDto map) {
        service.updateSubmitted(mapId, map);
    }

    @PutMapping("/api/maps/unsubmitted/{mapId}")
    public void updateUnsubmitted(@PathVariable Long mapId, @RequestBody MapDto map) {
        service.updateUnsubmitted(mapId, map);
    }

    @PutMapping("/api/maps/{mapId}/inMappool")
    public void updateInMappool(@PathVariable Long mapId, @RequestBody InMappoolUpdateDto update) {
        service.updateInMappool(mapId, update.getInMappool());
    }

    @DeleteMapping("/api/maps/{mapId}")
    public void delete(@PathVariable Long mapId) {
        service.delete(mapId);
    }
}
