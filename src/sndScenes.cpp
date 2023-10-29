#include "sndScenes.h"
#include "sndGlobals.h"
#include "sndLayout.h"

scenes currentScene = MENU;

Scene::Scene()
    : main(new sndWrapper("main"))
{
}

void Scene::Initialize()
{
    main->ClearWrappers();

    main->ResizeOuterLeft(0);
    main->ResizeOuterTop(0);
    main->ResizeOuterRight(GetRenderWidth());
    main->ResizeOuterBottom(GetRenderHeight());
}

void Scene::Update()
{
    Input();
    Process();

    BeginDrawing();
    ClearBackground(global.Getbackground());

    Output();

    EndDrawing();
}

void Scene::Input() {}
void Scene::Process() {}
void Scene::Output()
{
    main->Render();
}