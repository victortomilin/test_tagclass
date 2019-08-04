require "minitest/autorun"

module FizzBuzz
  class Algorithm
    def self.compute n
      (1..n).map do |x|
        y = ''
        y += 'Fizz' if (x % 3).zero?
        y += 'Buzz' if (x % 5).zero?
        y == '' ? x : "#{x} #{y}"
      end
    end
  end

  class Printer
    def self.print values
      values.each { |item| p item }
    end
  end

  class TestAlgorithm < Minitest::Test
    def test_that_fizz_buzz_processing_correctly
      expected = [
        1, 2, '3 Fizz', 4, '5 Buzz',
        '6 Fizz', 7, 8, '9 Fizz', '10 Buzz',
        11, '12 Fizz', 13, 14, '15 FizzBuzz'
      ]
      assert_equal Algorithm.compute(15), expected
    end
  end

  Printer.print Algorithm.compute 15
end
