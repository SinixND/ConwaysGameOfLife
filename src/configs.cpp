#include "configs.h" // provide object "config" for configurable parameters

Config config; // define extern object
Config::Config()
    : windowWidth(640)
    , windowHeight(480)
    , targetFPS(60)
    , fadingAgents(false)
    , debugMode(false)
    , initialLifeDensity(25)
    , agentGap(1)
    , agentWidth(10)
    , agentHeight(agentWidth)
    , agentInnerBorderWeight(1)
    , tickTime(0.5)
{
}
