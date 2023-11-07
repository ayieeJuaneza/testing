
import { useState, useEffect, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import shuffle from 'lodash/shuffle';
import Confetti from 'react-confetti';
import HeadingImage from '../images/7bup_q6el_211021-removebg-preview.png';
import Play from '../images/play.svg';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { decryptData } from '../Utils';


function RaffleDeclare() {

    const IsapaTo = decryptData(sessionStorage.getItem('EhEto?'));
    // console.log(IsapaTo)

    const [names, setNames] = useState([]);
    const [initialLoad, setInitialLoad] = useState(false);
    const [windowHeight, setWindowHeight] = useState(null);
    const [windowWidth, setWindowWidth] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [wraffling, setWraffling] = useState(false);
    const [mobileToDeduct, setmobileToDeduct] = useState(null);
    const confettiWrapper = useRef(null);
    const height = 60;

    const history = useNavigate();

    useEffect(() => {

        if (IsapaTo !== "true") {
            history('/error');
        }
    }, [history]);
  

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_API_URL}/users/all-users`)
//       .then(res => res.json())
//       .then(data => {
//         const filteredData = data.users.filter(user => user.raffleTickets > 0);
//         setChoices(filteredData);
//         console.log(choices)http://localhost:4000/users/users/update-status/Test2
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

// const confirmation = () => {
//     ActivateAllUsers()
//     Swal.fire({
//         title: "ARE YOU SURE?",
//         icon: "info",
//         confirmButtonText: "OK",
//         allowOutsideClick: false,
//         showCancelButton: true
//     })
//     .then((result) => {
//         if (!result.isConfirmed) {
//             window.location.reload()
//         }else{
//             window.location.reload()
//         }
//     });
// }


const mobileNumbers = () => {

  Swal.fire({
    title: "START NEXT ROUND?",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "OK",
})
.then((result) => {
    if (result.isConfirmed) {
      sessionStorage.setItem("mobileNumbers", mobileToDeduct)
      Swal.fire({
        title: "NEW ROUND STARTED",
        icon: "success",
        confirmButtonText: "OK",
        timer: 1000
    })
    }
    else{
        window.location.reload()
    }
});
}

const removeMobile = () => {
    sessionStorage.removeItem("mobileNumbers")
}

const updateStatus = () => {
    fetch(`http://192.168.210.77:4000/users/users/update-status/${sessionStorage.getItem("lastFirstName")}`, {
        method: "PUT"
    })
    .then((res) => res.json())
    .then((data) => {
        // console.log(data)
        // console.log(sessionStorage.getItem("lastFirstName"))
    })
    .catch((error) => {
        // console.error("Error:", error);
    }); 
}

useEffect(() => {
    fetch(`http://192.168.210.77:4000/users/all-users`)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        const filteredUsers = data.users.filter(user => user.raffleTickets > 0 && user.isActive === true);
        setNames(filteredUsers);
        const mobileNumbers = filteredUsers.map(user => user.mobileNo);
        // sessionStorage.setItem("mobileNumbers", JSON.stringify(mobileNumbers));
        setmobileToDeduct(JSON.stringify(mobileNumbers))
    })
}, [])

// const showPlayers = () => {
//     fetch(`http://192.168.210.146:4000/users/all-users`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         const filteredUsers = data.users.filter(user => user.raffleTickets > 0 && user.isActive === true);
//         setNames(filteredUsers);
//         const mobileNumbers = filteredUsers.map(user => user.mobileNo);
//         // sessionStorage.setItem("mobileNumbers", JSON.stringify(mobileNumbers));
//         setmobileToDeduct(JSON.stringify(mobileNumbers))
//         // ActivateAllUsers()
//     })
// }

// console.log( typeof sessionStorage.getItem("mobileNumbers"));
// console.log(mobileToDeduct);

const deductRaffleTickets = () => {
    const storedMobileNumbers = JSON.parse(sessionStorage.getItem("mobileNumbers"));

    if (storedMobileNumbers && Array.isArray(storedMobileNumbers) && storedMobileNumbers.length > 0) {
        const mobileNumbersPayload = storedMobileNumbers.map(mobileNumber => ({ mobileNo: mobileNumber }));

        fetch(`http://192.168.210.77:4000/users/subtract-raffle-tickets-multiple`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ mobileNumbers: mobileNumbersPayload })
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            // console.log(mobileNumbersPayload);
            // console.log(typeof mobileNumbersPayload);
        })
        .catch((error) => {
            // console.error("Error:", error);
        });
    }
};


const transitions = useTransition(
    names.map((data, i) => ({ ...data, y: 0.5 * i })),
    (e) => e.firstName,
    {
      from: { position: 'initial', opacity: 0 },
      leave: {
        height: height - (height * 0.2),
        opacity: 0,
      },
      enter: ({ y }) => ({ y, opacity: 1 }),
      update: ({ y }) => ({ y }),
    }
  );

// const transitions = useTransition(
//     names.slice(0, names.length - 1).map((data, i) => ({ ...data, y: 0.5 * i })),
//     (item) => item.firstName,
//     {
//       from: { position: 'initial', opacity: 0 },
//       leave: { height: 0, opacity: 0 },
//       enter: ({ y }) => ({ y, opacity: 1 }),
//       update: ({ y }) => ({ y }),
//     }
//   );

  function startRaffle() {
    if (names.length <= 1) {
      setWraffling(true);
      setShowConfetti(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * names.length);
    const filterOutNames = names.filter((name) => name !== names[randomIndex]);
    setNames(filterOutNames);
    setInitialLoad(true);
  }

//   function restartRaffle() {
//     setInitialLoad(false);
//     setWraffling(false);
//     setShowConfetti(false);
//     deductRaffleTickets()
//     window.location.reload();
//   }

// function restartRaffle() {
//     setInitialLoad(false);
//     setWraffling(false);
//     setShowConfetti(false);
//     deductRaffleTickets();
//     updateStatus()
//     const lastFirstName = names[names.length - 1].firstName; // Retrieve the last first name before shuffling
//     sessionStorage.setItem('lastFirstName', lastFirstName); // Store the last first name in session storage
//     const shuffledNames = shuffle(names.slice(0, names.length - 1)); // Shuffle the array, excluding the last element
//     setNames(shuffledNames);
//     // window.location.reload()
//   }

const ActivateAllUsers = () => {
    fetch(`http://192.168.210.77:4000/users/activate-all`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => {
        // console.log(data.message)
        if (data.message === "All users activated successfully"){
            Swal.fire({
                title: "PLAYERS LISTED",
                text: "All have raffle tickets are back", 
                icon: "success",
                confirmButtonText: "OK",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location.reload()
                }
                else{
                    window.location.reload()
                }
            });
        }else{
            Swal.fire({
                title: "RESETTING DENIED",
                icon: "error",
                confirmButtonText: "OK",
            })
        }
    })
}

const restartRaffle = () => {

    
    const lastFirstName = names[names.length - 1].firstName; // Retrieve the last first name before shuffling
    sessionStorage.setItem('lastFirstName', lastFirstName); // Store the last first name in session storage
    const shuffledNames = shuffle(names.slice(0, names.length - 1)); // Shuffle the array, excluding the last element
    setNames(shuffledNames);
    deductRaffleTickets()

    Swal.fire({
        title: "START NEXT ROUND?",
        icon: "info",
        confirmButtonText: "OK",
        allowOutsideClick: false
    })
    .then((result) => {
        if (result.isConfirmed) {
            setInitialLoad(false);
            setWraffling(false);
            setShowConfetti(false);
            // updateStatus()
            removeMobile()
            window.location.reload()
        }
    });
}
  

  useEffect(() => {
    if (initialLoad) {
      const filteringTimer = setTimeout(() => {
        startRaffle();
      }, 700);
      return () => {
        clearTimeout(filteringTimer);
      };
    }
  }, [initialLoad, names, startRaffle]);

  useEffect(() => {
    setWindowHeight(confettiWrapper.current.clientHeight);
    setWindowWidth(confettiWrapper.current.clientWidth);
  }, []);


  return (
    <div className="containers" ref={confettiWrapper}>
      <div className="raffle-header">
        <img className="banner-image" src={HeadingImage} alt="heading logo" />
        <h4>Total Participants: {names.length}</h4>
        {!initialLoad && (
          <div className="raffle-header__buttons">
            <button className="button-primary" onClick={startRaffle}>
              <img src={Play} alt="heading logo" />
              Start Raffle
            </button>
            <button
              className="button-outline"
              onClick={() => setNames(shuffle(names))}
            >
              Shuffle
            </button>
            <button className="button-outline" style={{ backgroundColor: 'gray', color: 'white' }} onClick={ActivateAllUsers}>
                Re-List
            </button>
            <button className="button-outline" style={{ backgroundColor: '#CD5C08', color: 'white' }} onClick={mobileNumbers} >
                New Draw?
            </button>
          </div>
        )}
      </div>
      {wraffling && (
        <Confetti
          recycle={showConfetti}
          numberOfPieces={80}
          width={windowWidth}
          height={windowHeight}
        />
      )}
      <div className="raffle-names">
        {transitions.map(({ item, props: { y, ...rest }, index }) => (
          <animated.div
            className="raffle-listnames"
            key={index}
            style={{
              transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
              ...rest
            }}
          >
            <div className="raffle-namelist">
              <span>{item.firstName}</span>
            </div>
          </animated.div>
        ))}
      </div>
      <div>
        {showConfetti && (
          <div className="raffle-ends">
            {/* <h3>Congratulations! You have won AQUAFLASK!</h3> */}
            <h4>Sponsored By: Sir. Francis</h4>
            <button className="button-outline" onClick={restartRaffle}>
              Replay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RaffleDeclare;