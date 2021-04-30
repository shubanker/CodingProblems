import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class PowerfulIntegers {
	public List<Integer> powerfulIntegers(int x, int y, int bound) {
		HashSet<Integer> powerfulIntegers = new HashSet<Integer>();
		List<Integer> powsX = new ArrayList<Integer>();
		powsX.add(1);
		List<Integer> powsY = new ArrayList<Integer>();
		powsY.add(1);

		if (x > 1) {
			int lastPow = 1;
			while (lastPow <= bound) {
				lastPow *= x;
				powsX.add(lastPow);
			}
			powsX.remove(powsX.size() - 1);
		}
		if (y > 1) {
			int lastPow = 1;
			while (lastPow <= bound) {
				lastPow *= y;
				powsY.add(lastPow);
			}
			powsY.remove(powsY.size() - 1);
		}
		for (Integer powx : powsX) {
			for (Integer powy : powsY) {
				int sum = powx + powy;
				if (sum > bound) {
					break;
				}
				powerfulIntegers.add(sum);
			}
		}
		return new ArrayList<>(powerfulIntegers);
	}
}
