#include "sndConfigs.h" // provide object "config" for configurable parameters
#include "sndGlobals.h" // provide object "global" for not configurable application parameters
#include "sndScenes.h"
#define BENCHMARK_IMPLEMENTATION
#include "sndBenchmark.h"
#define RAYGUI_IMPLEMENTATION // only define once
#define RAYGUI_CUSTOM_ICONS     // Custom icons set required 
#include "../resources/iconset.rgi.h"  
#include <raygui.h>
#include <raylib.h>
#include <iostream>

int main()
{
    // Initialization
    //---------------------------------
    const int screenWidth = 450;
    const int screenHeight = 550;


    SetConfigFlags(FLAG_WINDOW_RESIZABLE);
    SetConfigFlags(FLAG_WINDOW_TRANSPARENT);

    InitWindow(screenWidth, screenHeight, "Conway's Game of Life");

    SetTargetFPS(config.targetFPS);
    GuiSetStyle(DEFAULT, TEXT_SIZE, 20);
    SetExitKey(0);
    GuiSetIconScale(2);
    //---------------------------------

    Menu menu;
    Settings settings;
    Game game;

    // Main app loop
    //---------------------------------
    while (!WindowShouldClose() && !global.exitApp) // Detect window close button or ESC key
    {
        if(IsWindowResized())
        {
            menu.Initialize();
            settings.Initialize();
            game.Initialize();
        }
    
        switch (currentScene)
        {
        case MENU:
            menu.Update();
            break;

        case GAME:
            game.Update();
            break;

        case SETTINGS:
        sxd::StartBenchmark("SETTINGS");
            settings.Update();
            sxd::StopBenchmark("SETTINGS");
            break;

        default:
            break;
        }
        sxd::ShowBenchmarks();
    }
    //---------------------------------

    // De-Initialization
    //---------------------------------
    CloseWindow(); // Close window and OpenGL context
    //---------------------------------

    return 0;
}
