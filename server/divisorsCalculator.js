function calculateDivisors(number) {
    let divisors = [1]
    
    for (var i = 2; i < parseInt(number/2); i++) {
      if (number % i == 0) {
        divisors.push(i)
      }
    }

    if (number > 1) {
        divisors.push(number)
    }
    
    return divisors
}

exports.calculateDivisors = calculateDivisors