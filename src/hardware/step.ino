#include "step.h"

void spin(int steps) {
  myStep.setSpeed(TEN_RPM);
  myStep.step(steps);
}
