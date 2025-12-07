import React from 'react';


const CharacterPreview = ({ character }) => {
  const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || "http://localhost:5173/toon-tailor/";
  return (
    <div className="bg-[#110463] p-4 rounded-lg shadow-md max-w-sm mx-auto ">
      <h2 className="text-xl font-semibold mb-3 text-center text-white">Character Preview</h2>
      <div className="flex flex-col items-center ">
        {/* Main container with fixed dimensions */}


        <div className="transition-all" style={{ overflow: 'hidden', width: '250px', height: '414px' }}>
          <div className="h-full w-full floating">
            <div className="relative">
              <div>
                {character.equipment.bag &&
                  <div className="absolute top-0">
                    <img src={`${PUBLIC_URL}/assets/avatars/backpacks/${character.equipment.bag.toLowerCase()}.svg`}  alt="backpack"  className="transition-all height-[414px] width-[250px]" />
                  </div>
                }
                <div className="absolute top-0">
                  <div className="absolute top-0">
                    <svg width="250" height="414" viewBox="0 0 230 380"
                      fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all">
                      <path fillRule="evenodd" clipRule="evenodd" d="M50.4778 106.45C44.6095 126.508 42.2065 
157.657 57.5429 170.176H57.5967C83.7136 191.511 152.856 176.429 163.68 171.767C172.349 168.038 
177.088 162.279 181.181 155.149C184.896 148.678 188.935 130.689 186.512 117.198C185.352 110.882 
183.343 105.047 181.241 100.221C174.02 79.1462 152.65 62.3078 115.739 61.8042C88.1265 61.4253
 66.6561 74.0293 56.0487 92.6234C55.6335 93.3223 55.2158 94.097 54.7991 94.9403C52.944 98.5848 
 51.4926 102.438 50.4778 106.45Z" fill={character.appearance.skinTone}>
                      </path>
                    </svg>
                  </div>
                  <div className="absolute top-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="250" height="414" viewBox="0 0 250 414" >

                      <g transform="matrix(1 0 0 1 94.06 165.75)">
                        <g vectorEffect="non-scaling-stroke">
                          {/* Right Eye */}
                          <g transform="matrix(1.08 0 0 1.08 26.61 -4.1)">
                            <path
                              style={{
                                stroke: "none",
                                strokeWidth: 1,
                                fill: character.appearance.eyeColor || "rgb(139,0,0)",
                                fillRule: "nonzero",
                                opacity: 1,
                              }}
                              transform="translate(-69.58, -89.99)"
                              d="M 69.5766 102.288 C 73.7966 102.288 77.1866 96.7985 77.1866 89.9885 C 77.1866 83.1785 73.7966 77.6885 69.5766 77.6885 C 65.3566 77.6885 61.9766 83.1785 61.9766 89.9885 C 61.9766 96.7985 65.3666 102.288 69.5766 102.288 Z"
                            />
                          </g>

                          {/* Left Eye */}
                          <g transform="matrix(1.08 0 0 1.08 -26.61 -7.56)">
                            <path
                              style={{
                                stroke: "none",
                                strokeWidth: 1,
                                fill: character.appearance.eyeColor || "rgb(139,0,0)",
                                fillRule: "nonzero",
                                opacity: 1,
                              }}
                              transform="translate(-20.13, -86.77)"
                              d="M 20.1364 98.4084 C 24.3464 98.4084 27.7364 93.2184 27.7364 86.7684 C 27.7364 80.3184 24.3464 75.1284 20.1364 75.1284 C 15.9264 75.1284 12.5264 80.3184 12.5264 86.7684 C 12.5264 93.2184 15.9164 98.4084 20.1364 98.4084 Z"
                            />
                          </g>

                          {/* Eye Highlight and Reflection */}
                          <g transform="matrix(1.08 0 0 1.08 -2.79 9.53)">
                            <path
                              style={{
                                stroke: "none",
                                strokeWidth: 1,
                                fill: "#000000",
                                fillRule: "nonzero",
                                opacity: 1,
                              }}
                              transform="translate(-42.23, -102.67)"
                              d="M 41.5642 103.49 C 36.3256 114.922 23.371 104.573 31.2352 97.5149 C 31.5482 97.234 32.0007 97.6031 31.8404 97.992 C 30.6547 100.869 30.0445 104.985 34.0652 105.99 C 36.7094 106.431 40.129 103.376 41.2459 100.933 C 41.3368 100.734 41.7823 100.736 41.8671 100.938 C 42.968 103.554 46.4803 107.318 50.5652 105.99 C 54.5914 104.682 54.6356 101.471 52.9224 97.0214 C 52.7624 96.6059 53.2601 96.2984 53.5313 96.6515 C 61.3668 106.853 45.8362 114.405 41.5642 103.49 Z"
                            />
                          </g>

                          {/* Freckles (Peach Color Dots) */}
                          {[
                            { transform: "matrix(1.08 0 0 1.08 19.03 13.66)" },
                            { transform: "matrix(1.08 0 0 1.08 26.57 14.75)" },
                            { transform: "matrix(1.08 0 0 1.08 21.18 19.05)" },
                            { transform: "matrix(1.01 -0.39 0.39 1.01 -29.1 12.13)" },
                            { transform: "matrix(1.01 -0.39 0.39 1.01 -21.68 10.42)" },
                            { transform: "matrix(1.01 -0.39 0.39 1.01 -25.15 16.37)" },
                          ].map((freckle, idx) => (
                            <g key={`freckle-${idx}`} transform={freckle.transform}>
                              <circle
                                style={{
                                  stroke: "none",
                                  strokeWidth: 1,
                                  fill: "rgb(248,133,108)",
                                  fillRule: "nonzero",
                                  opacity: 1,
                                }}
                                cx="0"
                                cy="0"
                                r="1"
                              />
                            </g>
                          ))}

                          {/* Eye Whites */}
                          <g transform="matrix(1.08 0 0 1.08 24.41 -9.24)">
                            <ellipse
                              style={{
                                stroke: "none",
                                strokeWidth: 1,
                                fill: "rgb(230,230,229)",
                                fillRule: "nonzero",
                                opacity: 1,
                              }}
                              cx="0"
                              cy="0"
                              rx="3"
                              ry="4"
                            />
                          </g>
                          <g transform="matrix(1.08 0 0 1.08 -29.38 -12.46)">
                            <ellipse
                              style={{
                                stroke: "none",
                                strokeWidth: 1,
                                fill: "rgb(230,230,229)",
                                fillRule: "nonzero",
                                opacity: 1,
                              }}
                              cx="0"
                              cy="0"
                              rx="3"
                              ry="4"
                            />
                          </g>
                        </g>
                      </g>

                    </svg>
                  </div>
                  <div className="absolute top-0">
                    <canvas width="250" height="414">
                    </canvas>
                  </div>
                  <svg viewBox="0 0 249 413" xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 w-[250px] h-[414px]">
                    <defs >
                      <clipPath id="myCurve" clipPathUnits="objectBoundingBox">
                        <path d="M0.203 0.279
               C0.249 0.206 0.375 0.162 0.502 0.163
               C0.596 0.163 0.777 0.182 0.813 0.303
               C0.823 0.341 0.799 0.375 0.837 0.392
               C0.936 0.437 0.952 0.584 0.952 0.631
               L0.992 0.995
               L0.008 0.995
               L0.048 0.542
               C0.051 0.512 0.063 0.482 0.083 0.455
               L0.127 0.397
               L0.143 0.379
               C0.170 0.348 0.182 0.312 0.203 0.279Z">
                        </path>
                      </clipPath>
                    </defs>
                  </svg>

                </div>

                {character.equipment.hat && character.equipment.hair==="Curlylong" ?
                <>
                <div className="absolute top-0">
                      <img src={`${PUBLIC_URL}/assets/avatars/hairstyles/${character.appearance.hairColor.toLowerCase()}${character.equipment.hair.toLowerCase()}.svg`}
                        alt='Hairstyle' fill="#CE5986" className="transition-all h-[414px] w-[250px]" />
                    </div>
                  <div className="absolute top-0">
                    <img src={`${PUBLIC_URL}/assets/avatars/hats/${character.equipment.hat.toLowerCase()}.svg`}
                      alt="Hat" className="transition-all h-[414px] w-[250px]" />
                  </div>
                  </>
                  : character.equipment.hat ?
                  <div className="absolute top-0">
                  <img src={`${PUBLIC_URL}/assets/avatars/hats/${character.equipment.hat.toLowerCase()}.svg`}
                    alt="Hat" className="transition-all h-[414px] w-[250px]" />

                </div>

                  :
                  character.equipment.hair ?
                    <div className="absolute top-0">
                      <img src={`${PUBLIC_URL}/assets/avatars/hairstyles/${character.appearance.hairColor.toLowerCase()}${character.equipment.hair.toLowerCase()}.svg`}
                        alt='Hairstyle' fill="#CE5986" className="transition-all h-[414px] w-[250px]" />
                    </div>
                    : null}
                <div className="absolute top-0">
                  <svg data-testid="body-svg" width="250" height="414" viewBox="0 0 230 380" fill="FFFFFF" xmlns="http://www.w3.org/2000/svg" className="transition-all">
                    <path fill={character.appearance.skinTone} d="M178.471 269.902L171.047 221.043L163.871 191.479C163.135 
               188.44 161.92 185.595 160.32 183.025C160.292 182.988 160.274 182.952 160.246 
               182.915C158.562 180.253 156.456 177.885 154.018 175.921C153.972 175.884 153.926 175.847 
               153.88 175.81C153.484 175.498 153.079 175.186 152.665 174.893C152.656 174.893 152.647 
               
               174.893 152.638 174.893C134.596 179.243 100.648 184.365 76.2316 178.509C76.2224 178.537 
               76.204 178.573 76.1948 178.601C59.0092 216.784 49.616 257.639 47.546 268.663C47.1044 
               278.86 63.1492 280.292 69.8468 279.741C69.8468 291.297 67.8872 291.389 69.5432 
               327.342C69.7548 331.867 72.5056 335.888 76.6456 337.558C80.6108 339.174 84.8244 339.624 
               89.59 339.137C94.8616 338.595 99.0568 334.401 99.71 329.05C102.36 307.525 103.979 292.307 
               105.754 277.52C106.923 289.957 110.124 314.299 114.964 329.628C117.365 337.219 124.697 
               342.028 132.453 341.009C133.014 340.936 133.584 340.844 134.146 340.743C141.745 339.376 
               147.302 332.648 147.403 324.791C147.964 284.065 140.107 248.277 141.11 209.974C141.607 
               225.119 147.881 257.373 152.941 275.482C154.422 280.815 159.363 284.386 164.809 
               284.046C166.658 283.936 168.563 283.596 170.329 283.055C175.904 281.384 179.354 
               275.73 178.471 269.902Z"></path>
                    <path opacity="0.26" fill="#202020" d="M62.79 279.63C65.4856 279.915 68.0064 279.915 69.8464
                279.759C69.3312 277.96 75.4492 222.896 76.9028 213.121C76.9028 213.121 66.2492 261.346 
                62.7992 279.639L62.79 279.63Z">
                    </path>
                    <path opacity="0.26" fill="#202020" d="M160.319 183.033C160.319 183.033 160.273 182.96 160.246 
                182.923C158.562 180.261 156.455 177.902 154.017 175.929C153.971 175.892 153.925 175.856 
                153.879 175.819C153.474 175.498 153.051 175.204 152.637 174.91C134.596 179.261 100.648 
                184.383 76.2311 178.527C76.2219 178.554 76.2035 178.591 76.1943 178.618C99.2863 190.844 
                141.478 187.953 160.328 183.033H160.319Z"></path>
                  </svg>

                </div>

                {character.equipment.foot &&
                  <div className="absolute top-0">
                    <img src={`${PUBLIC_URL}/assets/avatars/footwears/${character.equipment.foot.toLowerCase()}.svg`}
                      alt="footwear" className="transition-all h-[414px] w-[250px]" />
                  </div>}


                {character.equipment.pant &&
                  <div className="absolute top-0">
                    <img src={`${PUBLIC_URL}/assets/avatars/bottomwears/${character.equipment.pant.toLowerCase()}.svg`}
                      alt="bottomwear" className="transition-all h-[414px] w-[250px]" />
                  </div>}
                {character.equipment.top &&
                  <div className="absolute top-0">
                    <img src={`${PUBLIC_URL}/assets/avatars/topwears/${character.equipment.top.toLowerCase()}.svg`}
                      alt="topwear" className="transition-all h-[414px] w-[250px]" />
                  </div>}
                {character.equipment.accessory &&
                  <div className="absolute top-0">
                    <img src={`${PUBLIC_URL}/assets/avatars/accessories/${character.equipment.accessory.toLowerCase()}.svg`}
                      alt="accessory" className="transition-all h-[414px] w-[250px]" />
                  </div>}

              </div>
            </div>
          </div>
        </div>
      </div>




      <h3 className="text-2xl font-medium mt-4 text-white">
        {character.name || 'Unnamed Character'}
      </h3>
      <p className="text-lg text-gray-600 text-white">
        Level {character.level}
      </p>
      <p className="text-base text-gray-700 text-white">
        {character.race} {character.class}
      </p>
    </div>

  );
};

export default CharacterPreview;