import { useState, MouseEvent, useCallback, useMemo } from "react";
import Link from "next/link";

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

const CharacterCard = ({ character }: any) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = (y - centerY) / 7;
    const rotateY = (centerX - x) / 7;

    setRotate({ x: rotateX, y: rotateY });
  }, []);

  const throttledMouseMove = useMemo(
    () => throttle(onMouseMove, 100),
    [onMouseMove]
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <>
      {character.id && (
        <div
          key={character.id}
          className="relative bg-background border border-gray-600 rounded-lg text-gray-300 transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s]"
          onMouseMove={throttledMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            transform: `perspective(3000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
            transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
          }}
        >
          <div className="bg-background peer rounded-lg p-4 ">
            {character.name && (
              <h2 className="text-xl font-bold">
                <Link
                  href={`/characters/${character.id}`}
                  className="hover:text-swyellow transition-colors delay-30 ease-in-out duration-150"
                >
                  {character.name}
                </Link>
              </h2>
            )}
            {character.height && <p>Height: {character.height}</p>}
            {character.mass && <p>Mass: {character.mass}</p>}
            {character.gender && <p>Gender: {character.gender}</p>}
          </div>
          <div className="-z-10 opacity-0 peer-hover:opacity-65 absolute -inset-2 rounded-lg bg-gradient-to-br from-black via-transparent to-swyellow blur-xl transition-opacity ease-in-out delay-60 duration-300" />
        </div>
      )}
    </>
  );
};

export default CharacterCard;
