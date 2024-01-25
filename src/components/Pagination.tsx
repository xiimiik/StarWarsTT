import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ArrowLeftIcon from '../assets/icons/arrow-left.svg';
import ArrowRightIcon from '../assets/icons/arrow-right.svg';
import { colors } from '../utils';

const ITEMS_PER_PAGE = 10;

type Props = {
  total: string;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(Number(total) / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const renderPageButton = (pageNumber: number) => (
      <TouchableOpacity
        key={pageNumber}
        style={[
          styles.page,
          {
            backgroundColor:
              currentPage === pageNumber ? colors.white : colors.transparent,
          },
        ]}
        onPress={() => handlePageChange(pageNumber)}>
        <Text
          style={[
            styles.pageText,
            { color: currentPage === pageNumber ? colors.black : colors.white },
          ]}>
          {pageNumber}
        </Text>
      </TouchableOpacity>
    );

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      if (currentPage === 1) {
        pageNumbers.push(renderPageButton(1));
        pageNumbers.push(renderPageButton(2));
        pageNumbers.push(renderPageButton(totalPages));
      } else if (currentPage === totalPages) {
        pageNumbers.push(renderPageButton(1));
        pageNumbers.push(renderPageButton(totalPages - 1));
        pageNumbers.push(renderPageButton(totalPages));
      } else {
        pageNumbers.push(renderPageButton(1));
        pageNumbers.push(renderPageButton(currentPage));
        pageNumbers.push(renderPageButton(totalPages));
      }
    }

    return pageNumbers;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        key="prev"
        onPress={() => {
          if (currentPage > 1) {
            handlePageChange(currentPage - 1);
          }
        }}>
        <ArrowLeftIcon width={24} height={24} style={{ color: colors.gray }} />
      </TouchableOpacity>

      {renderPageNumbers()}

      <TouchableOpacity
        key="next"
        onPress={() => {
          if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
          }
        }}>
        <ArrowRightIcon width={24} height={24} style={{ color: colors.gray }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 15,
  },
  page: {
    borderRadius: 100,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.white,
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
